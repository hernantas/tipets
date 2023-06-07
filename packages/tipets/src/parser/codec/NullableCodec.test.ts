import { NullableCodec } from './NullableCodec'
import { StringCodec } from './StringCodec'

describe('NullableCodec', () => {
  const codec = new NullableCodec(new StringCodec())

  it('Decoding a null should return null', () => {
    expect(codec.decode(null)).toBeNull()
  })

  it('Decoding non-null should decode its content', () => {
    expect(codec.decode(undefined)).toBe('')
  })

  it('Encoding a null should return null', () => {
    expect(codec.encode(null)).toBeNull()
  })

  it('Encoding non-null should encode its content', () => {
    expect(codec.encode('Hello')).toBe('Hello')
  })
})
