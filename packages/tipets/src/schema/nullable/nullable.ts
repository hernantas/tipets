import { Schema } from '../Schema'
import { NullableSchema } from './NullableSchema'

export function nullable<T extends Schema>(type: T): NullableSchema<T> {
  return new NullableSchema({ type })
}
