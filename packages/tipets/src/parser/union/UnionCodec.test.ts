import { number } from '../../schema'
import { string } from '../../schema/string/string'
import { NumberCodec } from '../number/NumberCodec'
import { StringCodec } from '../string/StringCodec'
import { UnionCodec } from './UnionCodec'

describe('UnionCodec', () => {
  const codec = new UnionCodec(
    {
      is: (value): value is number => number().is(value),
      codec: new NumberCodec(),
    },
    {
      is: (value): value is string => string().is(value),
      codec: new StringCodec(),
    }
  )

  it('Decoding should try to decode using all available codec', () => {
    expect(codec.decode(0)).toBe(0)
    expect(codec.decode('0')).toBe('0')
    expect(codec.decode('Hello')).toBe('Hello')
  })

  it('Encoding should try to encode using all available codec', () => {
    expect(codec.encode(0)).toBe(0)
    expect(codec.encode('0')).toBe('0')
    expect(codec.encode('Hello')).toBe('Hello')
  })
})
