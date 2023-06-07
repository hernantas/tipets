import { TypeOf } from '../../TypeOf'
import { Schema } from '../../schema/Schema'
import { NullableSchema } from '../../schema/nullable/NullableSchema'
import { Codec } from '../Codec'

export class NullableCodec<S extends Schema>
  implements Codec<NullableSchema<S>>
{
  public constructor(private readonly codec: Codec<S>) {}

  public decode(value: unknown): TypeOf<S> | null {
    return value === null ? null : this.codec.decode(value)
  }

  public encode(value: TypeOf<S> | null): unknown {
    return value === null ? null : this.codec.encode(value)
  }
}
