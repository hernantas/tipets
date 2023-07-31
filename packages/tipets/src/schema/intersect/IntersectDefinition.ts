import { Definition } from '../../schema'
import { TypeMapOf } from '../../type'
import { IntersectMap } from '../../type-helper'
import { MemberSchemaType } from '../MemberSchemaType'

export interface IntersectDefinition<T extends MemberSchemaType>
  extends Definition<IntersectMap<TypeMapOf<T>>> {
  readonly items: T
}
