import { Definition } from '../Definition'
import { MemberSchemaType } from '../MemberSchemaType'

export interface IntersectDefinition<T extends MemberSchemaType>
  extends Definition {
  readonly items: T
}
