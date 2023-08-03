import { Codec, DefaultCodec } from './codec'
import { UnsupportedTypeError, UnsupportedValueError } from './error'
import { CodecLoader } from './parser/CodecLoader'
import { LoadCodecFn } from './parser/LoadCodecFn'
import { ParserPluginFn } from './parser/ParserPluginFn'
import { defaultPlugin } from './parser/default/defaultPlugin'
import { Schema } from './schema'
import { TypeOf } from './type'
import { Violation } from './violation'

export interface ResultSuccess<T> {
  success: true
  value: T
}

export interface ResultFailed {
  success: false
  violations: Violation[]
}

export type Result<T> = ResultSuccess<T> | ResultFailed

export class Parser {
  private readonly codecMap: Map<string, Codec> = new Map()

  private readonly loaders: CodecLoader[] = []

  public static empty(fallbackLoadCodec?: LoadCodecFn): Parser {
    return new Parser(fallbackLoadCodec)
  }

  public static create(fallbackLoadCodec?: LoadCodecFn): Parser {
    return new Parser(fallbackLoadCodec).addPlugin(defaultPlugin)
  }

  private constructor(
    private readonly fallbackLoadCodec: LoadCodecFn = (schema) =>
      new DefaultCodec(schema)
  ) {}

  public addCodec<S extends Schema>(schema: S, codec: Codec<TypeOf<S>>): this {
    this.codecMap.set(schema.signature.toString(), codec)
    return this
  }

  public addLoader<S extends Schema>(loader: CodecLoader<S>): this {
    this.loaders.push(loader)
    return this
  }

  public addPlugin(plugin: ParserPluginFn): this {
    plugin(this)
    return this
  }

  public load<S extends Schema>(schema: S): Codec<TypeOf<S>> {
    const signature = schema.signature.toString()
    let codec = this.codecMap.get(signature)

    if (codec === undefined) {
      const loader = this.loaders.find((loader) => loader.is(schema))
      if (loader !== undefined) {
        codec = loader.create(schema, (schema) => this.load(schema))
      } else {
        codec = this.fallbackLoadCodec(schema)
      }
      this.codecMap.set(signature, codec)
    }

    return codec
  }

  public decode<S extends Schema>(value: unknown, schema: S): TypeOf<S> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.load(schema).decode(value)
  }

  public encode<S extends Schema>(value: TypeOf<S>, schema: S): unknown {
    return this.load(schema).encode(value)
  }

  public tryDecode<S extends Schema>(
    value: unknown,
    schema: S
  ): Result<TypeOf<S>> {
    try {
      const decoded = this.load(schema).decode(value)
      const violations = schema.validate(decoded)
      return violations.length === 0
        ? {
            success: true,
            value: decoded,
          }
        : {
            success: false,
            violations: violations,
          }
    } catch (error) {
      return {
        success: false,
        violations: [
          error instanceof UnsupportedTypeError ||
          error instanceof UnsupportedValueError
            ? error.toViolation()
            : {
                type: 'decode',
                message: 'Error occurred when decoding',
                args: {
                  error,
                },
              },
        ],
      }
    }
  }

  public tryEncode<S extends Schema>(
    value: TypeOf<S>,
    schema: S
  ): Result<unknown> {
    try {
      const encoded = this.load(schema).encode(value)
      const violations = schema.validate(encoded)
      return violations.length === 0
        ? {
            success: true,
            value: encoded,
          }
        : {
            success: false,
            violations: violations,
          }
    } catch (error) {
      return {
        success: false,
        violations: [
          error instanceof UnsupportedTypeError ||
          error instanceof UnsupportedValueError
            ? error.toViolation()
            : {
                type: 'encode',
                message: 'Error occurred when encoding',
                args: {
                  error,
                },
              },
        ],
      }
    }
  }
}
