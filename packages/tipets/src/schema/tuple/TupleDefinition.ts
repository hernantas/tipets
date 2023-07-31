import { Definition } from '../../schema'
import { TypeMapOf } from '../../type'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleDefinition<T extends TupleSchemaType>
  extends Definition<TypeMapOf<T>> {
  readonly items: T
}
