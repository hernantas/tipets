import { Signature } from '../Signature'

/**
 * Create new signature for {@link UndefinedSchema}
 *
 * @returns A new signature instance
 */
export function undefinedSignature(): Signature {
  return Signature.create('Undefined')
}
