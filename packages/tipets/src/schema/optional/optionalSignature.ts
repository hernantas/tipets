import { Schema } from '../Schema'
import { Signature } from '../Signature'

/**
 * Create new signature for {@link OptionalSchema}
 *
 * @returns A new signature instance
 */
export function optionalSignature(type: Schema): Signature {
  return Signature.create('Optional', type.signature)
}
