import { LiteralType } from '../../alias/LiteralType'
import { LiteralSchema } from './LiteralSchema'

/**
 * Create new instance of {@link LiteralSchema}
 *
 * @param value Literal value of schema
 * @returns A new instance of {@link LiteralSchema}
 */
export function literal<T extends LiteralType>(value: T): LiteralSchema<T> {
  return LiteralSchema.create(value)
}
