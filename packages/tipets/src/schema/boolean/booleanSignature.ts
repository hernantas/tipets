import { Signature } from '../Signature'

/**
 * Create new signature for {@link BooleanSchema}
 *
 * @returns A new signature instance
 */
export function booleanSignature(): Signature {
  return Signature.create('Boolean')
}
