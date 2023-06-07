import { Codec } from '../Codec'

export class ArrayCodec<T> implements Codec<T[]> {
  public constructor(private readonly codec: Codec<T>) {}

  public decode(value: unknown): T[] {
    const values = Array.isArray(value)
      ? value
      : value !== undefined && value !== null
      ? [value]
      : []
    return values.map((value) => this.codec.decode(value))
  }

  public encode(value: T[]): unknown {
    return value.map((value) => this.codec.encode(value))
  }
}
