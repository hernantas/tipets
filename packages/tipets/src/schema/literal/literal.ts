import { LiteralType } from '../../alias/LiteralType'
import { LiteralSchema } from './LiteralSchema'
import { literalSignature } from './literalSignature'

export function literal<T extends LiteralType>(value: T): LiteralSchema<T> {
  return new LiteralSchema({ signature: literalSignature(value), value })
}
