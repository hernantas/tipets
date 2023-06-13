import { TypeOf } from '../TypeOf'
import { Schema } from '../schema/Schema'
import { Codec } from './Codec'
import { LoadCodecFn } from './LoadCodecFn'
import { loadDefaultCodec } from './default/loadDefaultCodec'

export class Parser {
  private readonly codecMap: Map<string, Codec> = new Map()

  public constructor(
    private readonly fallbackLoadCodec: LoadCodecFn = loadDefaultCodec
  ) {}

  public addCodec<S extends Schema>(schema: S, codec: Codec<TypeOf<S>>): this {
    this.codecMap.set(schema.signature.toString(), codec)
    return this
  }

  public load<S extends Schema>(schema: S): Codec<TypeOf<S>> {
    const signature = schema.signature.toString()
    let codec = this.codecMap.get(signature)
    if (codec === undefined) {
      codec = this.fallbackLoadCodec(schema)
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
