import { ObjectType } from '../../alias/ObjectType'
import { Codec } from '../Codec'
import { CodecMap } from '../CodecMap'
import { UnsupportedTypeError } from '../UnsupportedTypeError'

export class ObjectCodec<T extends ObjectType> implements Codec<T> {
  public constructor(private readonly codecs: CodecMap<T>) {}

  public decode(value: unknown): T {
    if (typeof value === 'object' && value !== null) {
      return Object.fromEntries(
        Object.entries<Codec>(this.codecs).map(([key, codec]) => [
          key,
          codec.decode((value as ObjectType)[key]),
        ])
      ) as T
    }
    throw new UnsupportedTypeError(value)
  }

  public encode(value: T): unknown {
    return Object.fromEntries(
      Object.entries<Codec>(this.codecs).map(([key, codec]) => [
        key,
        codec.encode(value[key]),
      ])
    )
  }
}
