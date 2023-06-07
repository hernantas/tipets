import { Codec } from '../Codec'

export class NullableCodec<T> implements Codec<T | null> {
  public constructor(private readonly codec: Codec<T>) {}

  public decode(value: unknown): T | null {
    return value === null ? null : this.codec.decode(value)
  }

  public encode(value: T | null): unknown {
    return value === null ? null : this.codec.encode(value)
  }
}
