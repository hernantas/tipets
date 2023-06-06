import { Schema } from '../Schema'
import { Signature } from '../Signature'

/**
 * Create new signature for {@link ArraySchema}
 *
 * @returns A new signature instance
 */
export function arraySignature(schema: Schema): Signature {
  return Signature.create('Array', schema.signature)
}
