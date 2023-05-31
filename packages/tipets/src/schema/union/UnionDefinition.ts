import { TypeMapOf } from '../../TypeMapOf'
import { UnionMap } from './UnionMap'
import { Definition } from '../Definition'
import { MemberSchemaType } from '../MemberSchemaType'

export interface UnionDefinition<T extends MemberSchemaType>
  extends Definition<UnionMap<TypeMapOf<T>>> {
  readonly items: T
}
