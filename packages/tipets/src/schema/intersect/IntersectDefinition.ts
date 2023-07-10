import { Definition } from '../Definition'
import { MemberSchemaType } from '../MemberSchemaType'
import { TypeMapOf } from '../TypeMapOf'
import { IntersectMap } from './IntersectMap'

export interface IntersectDefinition<T extends MemberSchemaType>
  extends Definition<IntersectMap<TypeMapOf<T>>> {
  readonly items: T
}
