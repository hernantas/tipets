import { TypeOf } from '../../TypeOf'
import { Schema } from '../../schema/Schema'
import { ArraySchema } from '../../schema/array/ArraySchema'
import { Codec } from '../Codec'

export class ArrayCodec<S extends Schema> implements Codec<ArraySchema<S>> {
  public constructor(private readonly codec: Codec<S>) {}

  public decode(value: unknown): TypeOf<S>[] {
    const values = Array.isArray(value)
      ? value
      : value !== undefined && value !== null
      ? [value]
      : []
    return values.map((value) => this.codec.decode(value))
  }

  public encode(value: TypeOf<S>[]): unknown {
    return value.map((value) => this.codec.encode(value))
  }
}
