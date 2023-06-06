import { NullSchema } from './NullSchema'

/**
 * Create new instance of {@link NullSchema}
 *
 * @returns A new instance of {@link NullSchema}
 */
export function _null(): NullSchema {
  return NullSchema.create()
}
