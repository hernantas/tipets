import { Signature } from '../Signature'

/**
 * Create new signature for {@link AnySchema}
 *
 * @returns A new signature instance
 */
export function anySignature(): Signature {
  return Signature.create('Any')
}
