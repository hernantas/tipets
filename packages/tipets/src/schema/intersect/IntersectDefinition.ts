import { Definition } from '../../schema'
import { TypeMapOf } from '../../type'
import { MemberSchemaType } from '../MemberSchemaType'
import { IntersectMap } from './IntersectMap'

export interface IntersectDefinition<T extends MemberSchemaType>
  extends Definition<IntersectMap<TypeMapOf<T>>> {
  readonly items: T
}
