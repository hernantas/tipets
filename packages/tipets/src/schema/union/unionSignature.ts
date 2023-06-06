import { MemberSchemaType } from '../MemberSchemaType'
import { Signature } from '../Signature'

/**
 * Create new signature for {@link UnionSchema}
 *
 * @returns A new signature instance
 */
export function unionSignature(items: MemberSchemaType): Signature {
  return Signature.create('Union', ...items.map((item) => item.signature))
}
