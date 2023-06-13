import { TypeOf } from '../TypeOf'
import { Schema } from '../schema/Schema'
import { Codec } from './Codec'
import { CodecLoader } from './CodecLoader'
import { LoadCodecFn } from './LoadCodecFn'
import { ParserPluginFn } from './ParserPluginFn'
import { loadDefaultCodec } from './default/loadDefaultCodec'
import { defaultPlugin } from './defaultPlugin'

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
    private readonly fallbackLoadCodec: LoadCodecFn = loadDefaultCodec
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
    return this.load(schema).decode(value)
  }

  public encode<S extends Schema>(value: TypeOf<S>, schema: S): unknown {
    return this.load(schema).encode(value)
  }
}
