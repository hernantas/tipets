import { LiteralType } from '../../alias/LiteralType'
import { LiteralSchema } from '../../schema/literal/LiteralSchema'
import { Codec } from '../Codec'
import { UnsupportedValueError } from '../error/UnsupportedValueError'

export class LiteralCodec<T extends LiteralType>
  implements Codec<LiteralSchema<T>>
{
  public constructor(private readonly value: T) {}

  public decode(value: unknown): T {
    if (this.value === value) {
      return this.value
    }
    throw new UnsupportedValueError(value)
  }

  public encode(value: T): unknown {
    return value
  }
}
