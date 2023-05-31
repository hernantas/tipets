import { TupleSchema } from './TupleSchema'
import { TupleSchemaType } from './TupleSchemaType'

export function tuple<T extends TupleSchemaType>(...items: T): TupleSchema<T> {
  return new TupleSchema({ items })
}
