import { StringCodec } from '../string/StringCodec'
import { OptionalCodec } from './OptionalCodec'

describe('OptionalCodec', () => {
  const codec = new OptionalCodec(new StringCodec())

  it('Decoding a undefined should return undefined', () => {
    expect(codec.decode(undefined)).toBeUndefined()
  })

  it('Decoding non-undefined should decode its content', () => {
    expect(codec.decode(null)).toBe('')
  })

  it('Encoding a undefined should return undefined', () => {
    expect(codec.encode(undefined)).toBeUndefined()
  })

  it('Encoding non-undefined should encode its content', () => {
    expect(codec.encode('Hello')).toBe('Hello')
  })
})
