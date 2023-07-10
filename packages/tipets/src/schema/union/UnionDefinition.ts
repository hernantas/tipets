import { Definition } from '../Definition'
import { MemberSchemaType } from '../MemberSchemaType'
import { TypeMapOf } from '../TypeMapOf'
import { UnionMap } from './UnionMap'

export interface UnionDefinition<T extends MemberSchemaType>
  extends Definition<UnionMap<TypeMapOf<T>>> {
  readonly items: T
}
