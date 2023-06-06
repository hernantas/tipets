import { Signature } from '../Signature'

/**
 * Create new signature for {@link NumberSchema}
 *
 * @returns A new signature instance
 */
export function numberSignature(): Signature {
  return Signature.create('Number')
}
