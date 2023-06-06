import { Schema } from '../Schema'
import { ArraySchema } from './ArraySchema'

/**
 * Create new instance of {@link ArraySchema}
 *
 * @param type Inner type schema
 * @returns A new instance of {@link ArraySchema}
 */
export function array<S extends Schema>(type: S): ArraySchema<S> {
  return ArraySchema.create(type)
}
