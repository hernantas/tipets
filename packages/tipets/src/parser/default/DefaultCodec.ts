import { UnsupportedTypeError } from '../../error'
import { Schema } from '../../schema'
import { Codec } from '../Codec'

/**
 * Fallback codec. If codec is not found for particular schema, use its own
 * schema to decode/encode
 */
export class DefaultCodec<T> implements Codec<T> {
  public constructor(private readonly schema: Schema<T>) {}

  public decode(value: unknown): T {
    if (this.schema.is(value)) {
      return value
    }

    throw new UnsupportedTypeError(value)
  }

  public encode(value: T): T {
    return value
  }
}
