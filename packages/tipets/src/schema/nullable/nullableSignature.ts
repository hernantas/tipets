import { Schema } from '../Schema'
import { Signature } from '../Signature'

/**
 * Create new signature for {@link NullableSchema}
 *
 * @returns A new signature instance
 */
export function nullableSignature(schema: Schema): Signature {
  return Signature.create('Nullable', schema.signature)
}
