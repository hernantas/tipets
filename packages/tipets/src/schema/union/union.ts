import { MemberSchemaType } from '../MemberSchemaType'
import { UnionSchema } from './UnionSchema'

export function union<T extends MemberSchemaType>(...items: T): UnionSchema<T> {
  return new UnionSchema({ items })
}
