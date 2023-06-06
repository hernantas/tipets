import { NumberSchema } from './NumberSchema'

/**
 * Create new instance of {@link NumberSchema}
 *
 * @returns A new instance of {@link NumberSchema}
 */
export function number(): NumberSchema {
  return NumberSchema.create()
}
