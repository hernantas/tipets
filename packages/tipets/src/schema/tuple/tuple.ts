import { TupleSchema } from './TupleSchema'
import { TupleSchemaType } from './TupleSchemaType'

/**
 * Create new instance of {@link TupleSchema}
 *
 * @param items Member schemas
 * @returns A new instance of {@link TupleSchema}
 */
export function tuple<T extends TupleSchemaType>(...items: T): TupleSchema<T> {
  return TupleSchema.create(...items)
}
