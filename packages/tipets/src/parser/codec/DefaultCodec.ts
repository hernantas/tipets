import { TypeOf } from '../../TypeOf'
import { Schema } from '../../schema/Schema'
import { Codec } from '../Codec'
import { UnsupportedTypeError } from '../error/UnsupportedTypeError'

/**
 * Fallback codec. If codec is not found for particular schema, use its own
 * schema to decode/encode
 */
export class DefaultCodec<T extends Schema> implements Codec<T> {
  public constructor(private readonly schema: T) {}

  public decode(value: unknown): TypeOf<T> {
    if (this.schema.is(value)) {
      return value
    }

    throw new UnsupportedTypeError(value)
  }

  public encode(value: TypeOf<T>): TypeOf<T> {
    return value
  }
}
