import { MemberSchemaType } from '../MemberSchemaType'
import { Signature } from '../Signature'

/**
 * Create new signature for {@link IntersectSchema}
 *
 * @returns A new signature instance
 */
export function intersectSignature(items: MemberSchemaType): Signature {
  return Signature.create('Intersect', ...items.map((item) => item.signature))
}
