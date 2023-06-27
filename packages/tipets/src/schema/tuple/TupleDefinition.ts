import { Definition } from '../Definition'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleDefinition<T extends TupleSchemaType> extends Definition {
  readonly items: T
}
