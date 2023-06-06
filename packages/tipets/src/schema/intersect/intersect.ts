import { MemberSchemaType } from '../MemberSchemaType'
import { IntersectSchema } from './IntersectSchema'

/**
 * Create new instance of {@link IntersectSchema}
 *
 * @param items Member type schema
 * @returns A new instance of {@link IntersectSchema}
 */
export function intersect<T extends MemberSchemaType>(
  ...items: T
): IntersectSchema<T> {
  return IntersectSchema.create(...items)
}
