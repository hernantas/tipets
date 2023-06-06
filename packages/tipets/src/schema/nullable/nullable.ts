import { Schema } from '../Schema'
import { NullableSchema } from './NullableSchema'

/**
 * Create new instance of {@link NullableSchema}
 *
 * @param type Inner schema type
 * @returns A new instance of {@link NullableSchema}
 */
export function nullable<T extends Schema>(type: T): NullableSchema<T> {
  return NullableSchema.create(type)
}
