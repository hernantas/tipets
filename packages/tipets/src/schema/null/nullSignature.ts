import { Signature } from '../Signature'

/**
 * Create new signature for {@link NullSchema}
 *
 * @returns A new signature instance
 */
export function nullSignature(): Signature {
  return Signature.create('Null')
}
