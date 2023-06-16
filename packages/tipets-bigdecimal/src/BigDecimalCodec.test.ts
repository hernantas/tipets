import { Big } from 'bigdecimal.js'
import { BigDecimalCodec } from './BigDecimalCodec'

describe('BigDecimal Codec', () => {
  const codec = new BigDecimalCodec()

  it('Decoding should decode string', () => {
    expect(
      codec.decode('1234567890.123456789').equals(Big('1234567890.123456789'))
    ).toBe(true)
  })

  it('Decoding should decode number', () => {
    expect(codec.decode(1234567890.3).equals(Big('1234567890.3'))).toBe(true)
  })

  it('Decoding should decode BigInt', () => {
    expect(codec.decode(BigInt('1234567890')).equals(Big('1234567890'))).toBe(
      true
    )
  })

  it('Decoding should decode BigDecimal', () => {
    expect(
      codec
        .decode(Big('1234567890.123456789'))
        .equals(Big('1234567890.123456789'))
    ).toBe(true)
  })

  it('Encoding should parse to string', () => {
    expect(codec.encode(Big('1234567890.123456789'))).toBe(
      '1234567890.123456789'
    )
  })
})
