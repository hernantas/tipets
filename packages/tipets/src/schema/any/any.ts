import { AnySchema } from './AnySchema'

/**
 * Create new instance of {@link AnySchema}
 *
 * @returns A new instance of {@link AnySchema}
 */
export function any(): AnySchema {
  return AnySchema.create()
}
