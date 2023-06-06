import { Schema } from '../Schema'
import { OptionalSchema } from './OptionalSchema'

/**
 * Create new instance of {@link OptionalSchema}
 *
 * @param type Inner schema type
 * @returns A new instance of {@link OptionalSchema}
 */
export function optional<T extends Schema>(type: T): OptionalSchema<T> {
  return OptionalSchema.create(type)
}
