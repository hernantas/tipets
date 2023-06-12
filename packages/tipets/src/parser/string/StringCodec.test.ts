import { StringCodec } from './StringCodec'

describe('StringCodec', () => {
  const codec = new StringCodec()

  it('Decode must return string', () => {
    expect(typeof codec.decode('HELLO')).toBe('string')
    expect(typeof codec.decode(0)).toBe('string')
    expect(typeof codec.decode(false)).toBe('string')
    expect(typeof codec.decode(null)).toBe('string')
    expect(typeof codec.decode(undefined)).toBe('string')
  })

  it('Decode null or undefined must be empty string', () => {
    expect(codec.decode(null)).toBe('')
    expect(codec.decode(undefined)).toBe('')
  })

  it('Encode must return string', () => {
    expect(typeof codec.encode('HELLO')).toBe('string')
  })
})
