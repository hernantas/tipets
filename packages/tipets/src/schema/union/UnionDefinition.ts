import { Definition } from '../../schema'
import { TypeMapOf } from '../../type'
import { UnionMap } from '../../type-helper'
import { MemberSchemaType } from '../MemberSchemaType'

export interface UnionDefinition<T extends MemberSchemaType>
  extends Definition<UnionMap<TypeMapOf<T>>> {
  readonly items: T
}
