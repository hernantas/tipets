import { Signature } from '../Signature'

/**
 * Create new signature for {@link UnknownSchema}
 *
 * @returns A new signature instance
 */
export function unknownSignature(): Signature {
  return Signature.create('Unknown')
}
