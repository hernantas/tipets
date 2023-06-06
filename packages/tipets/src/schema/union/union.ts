import { MemberSchemaType } from '../MemberSchemaType'
import { UnionSchema } from './UnionSchema'

/**
 * Create new instance of {@link UnionSchema}
 *
 * @param items Member schema
 * @returns A new instance of {@link UnionSchema}
 */
export function union<T extends MemberSchemaType>(...items: T): UnionSchema<T> {
  return UnionSchema.create(...items)
}
