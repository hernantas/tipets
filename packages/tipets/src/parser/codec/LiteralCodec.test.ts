import { LiteralCodec } from './LiteralCodec'

describe('LiteralCodec', () => {
  describe('String literal', () => {
    const codec = new LiteralCodec('Hello')
    it('Decoding string literal should return the literal or throw', () => {
      expect(codec.decode('Hello')).toBe('Hello')
      expect(() => codec.decode(0)).toThrow()
    })
    it('Encoding string literal should return the literal', () => {
      expect(codec.encode('Hello')).toBe('Hello')
    })
  })

  describe('Number literal', () => {
    const codec = new LiteralCodec(0)
    it('Decoding number literal should return the literal or throw', () => {
      expect(codec.decode(0)).toBe(0)
      expect(() => codec.decode('Hello')).toThrow()
    })
    it('Encoding number literal should return the literal', () => {
      expect(codec.encode(0)).toBe(0)
    })
  })

  describe('Boolean literal', () => {
    const codec = new LiteralCodec(true)
    it('Decoding boolean literal should return the literal or throw', () => {
      expect(codec.decode(true)).toBe(true)
      expect(() => codec.decode(0)).toThrow()
    })
    it('Encoding boolean literal should return the literal', () => {
      expect(codec.encode(true)).toBe(true)
    })
  })
})
