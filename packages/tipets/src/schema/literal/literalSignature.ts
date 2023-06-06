import { LiteralType } from '../../alias/LiteralType'
import { Signature } from '../Signature'

/**
 * Create new signature for {@link LiteralSchema}
 *
 * @returns A new signature instance
 */
export function literalSignature(value: LiteralType): Signature {
  return Signature.create(`'${value.toString()}'`)
}
