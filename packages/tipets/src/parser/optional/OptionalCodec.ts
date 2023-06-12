import { Codec } from '../Codec'

export class OptionalCodec<T> implements Codec<T | undefined> {
  public constructor(private readonly codec: Codec<T>) {}

  public decode(value: unknown): T | undefined {
    return value === undefined ? undefined : this.codec.decode(value)
  }

  public encode(value: T | undefined): unknown {
    return value === undefined ? undefined : this.codec.encode(value)
  }
}
