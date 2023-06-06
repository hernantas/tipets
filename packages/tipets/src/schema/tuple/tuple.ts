import { TupleSchema } from './TupleSchema'
import { TupleSchemaType } from './TupleSchemaType'
import { tupleSignature } from './tupleSignature'

export function tuple<T extends TupleSchemaType>(...items: T): TupleSchema<T> {
  return new TupleSchema({ signature: tupleSignature(items), items })
}
