import { StringSchema } from './StringSchema'

/**
 * Create new instance of {@link StringSchema}
 *
 * @returns A new instance of {@link StringSchema}
 */
export function string(): StringSchema {
  return StringSchema.create()
}
