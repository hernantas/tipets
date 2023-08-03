import { UnsupportedValueError } from '../../error'
import { LiteralType } from '../../type-alias'
import { Codec } from '../Codec'

export class LiteralCodec<T extends LiteralType> implements Codec<T> {
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
