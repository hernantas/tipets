import { TupleType } from '../../type-alias'
import { Codec } from '../Codec'
import { CodecMap } from '../CodecMap'
import { UnsupportedTypeError } from '../UnsupportedTypeError'

export class TupleCodec<T extends TupleType> implements Codec<T> {
  private readonly codecs: CodecMap<T>

  public constructor(...codecs: CodecMap<T>) {
    this.codecs = codecs
  }

  public decode(value: unknown): T {
    if (Array.isArray(value)) {
      return this.codecs.map((codec, index) => codec.decode(value[index])) as T
    }
    throw new UnsupportedTypeError(value)
  }

  public encode(value: T): unknown {
    return this.codecs.map((codec, index) => codec.encode(value[index])) as T
  }
}
