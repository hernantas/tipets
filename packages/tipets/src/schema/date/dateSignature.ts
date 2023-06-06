import { Signature } from '../Signature'

/**
 * Create new signature for {@link DateSchema}
 *
 * @returns A new signature instance
 */
export function dateSignature(): Signature {
  return Signature.create('Date')
}
