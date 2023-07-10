import { Definition } from '../Definition'
import { TypeMapOf } from '../TypeMapOf'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleDefinition<T extends TupleSchemaType>
  extends Definition<TypeMapOf<T>> {
  readonly items: T
}
