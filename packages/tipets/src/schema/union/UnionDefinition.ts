import { Definition } from '../Definition'
import { MemberSchemaType } from '../MemberSchemaType'

export interface UnionDefinition<T extends MemberSchemaType>
  extends Definition {
  readonly items: T
}
