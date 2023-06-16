import { Big, BigDecimal, MathContext } from 'bigdecimal.js'
import { Codec, UnsupportedTypeError } from 'tipets'

export class BigDecimalCodec implements Codec<BigDecimal> {
  public decode(value: unknown): BigDecimal {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'bigint' ||
      value instanceof BigDecimal
    ) {
      return Big(value, undefined, MathContext.DECIMAL128)
    }
    throw new UnsupportedTypeError(value)
  }

  public encode(value: BigDecimal): unknown {
    return value.toPlainString()
  }
}
