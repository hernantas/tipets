import { MemberSchemaType } from '../MemberSchemaType'
import { IntersectSchema } from './IntersectSchema'

export function intersect<T extends MemberSchemaType>(
  ...items: T
): IntersectSchema<T> {
  return new IntersectSchema({ items })
}
