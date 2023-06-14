import { BigDecimalSchema } from './BigDecimalSchema'

/**
 * Create new instance of {@link BigDecimalSchema}
 *
 * @returns A new instance of {@link BigDecimalSchema}
 */
export function big(): BigDecimalSchema {
  return BigDecimalSchema.create()
}
