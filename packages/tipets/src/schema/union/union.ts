import { MemberSchemaType } from '../MemberSchemaType'
import { UnionSchema } from './UnionSchema'
import { unionSignature } from './unionSignature'

export function union<T extends MemberSchemaType>(...items: T): UnionSchema<T> {
  return new UnionSchema({ signature: unionSignature(items), items })
}
