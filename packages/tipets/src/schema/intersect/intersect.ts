import { MemberSchemaType } from '../MemberSchemaType'
import { IntersectSchema } from './IntersectSchema'
import { intersectSignature } from './intersectSignature'

export function intersect<T extends MemberSchemaType>(
  ...items: T
): IntersectSchema<T> {
  return new IntersectSchema({ signature: intersectSignature(items), items })
}
