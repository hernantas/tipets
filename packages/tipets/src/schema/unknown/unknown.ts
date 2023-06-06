import { UnknownSchema } from './UnknownSchema'

/**
 * Create new instance of {@link UnknownSchema}
 *
 * @returns A new instance of {@link UnknownSchema}
 */
export function unknown(): UnknownSchema {
  return UnknownSchema.create()
}
