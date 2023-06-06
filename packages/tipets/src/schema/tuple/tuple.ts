import { TupleSchema } from './TupleSchema'
import { TupleSchemaType } from './TupleSchemaType'

export function tuple<T extends TupleSchemaType>(...items: T): TupleSchema<T> {
  return new TupleSchema({ signature: TupleSchema.signature(items), items })
}
