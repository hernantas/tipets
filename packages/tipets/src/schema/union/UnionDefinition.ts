import { Definition } from '../../schema'
import { TypeMapOf } from '../../type'
import { MemberSchemaType } from '../MemberSchemaType'

import { UnionMap } from './UnionMap'

export interface UnionDefinition<T extends MemberSchemaType>
  extends Definition<UnionMap<TypeMapOf<T>>> {
  readonly items: T
}
