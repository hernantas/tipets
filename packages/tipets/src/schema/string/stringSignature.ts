import { Signature } from '../Signature'

/**
 * Create new signature for {@link StringSchema}
 *
 * @returns A new signature instance
 */
export function stringSignature(): Signature {
  return Signature.create('String')
}
