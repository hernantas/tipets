import { DateCodec } from './DateCodec'

describe('DateCodec', () => {
  const codec = new DateCodec()

  it('Decoding a date should return date', () => {
    expect(codec.decode(new Date())).toBeInstanceOf(Date)
  })

  it('Decoding a string should return a date if valid or throw', () => {
    expect(codec.decode('2023-05-23T23:59:59.999Z')).toBeInstanceOf(Date)
    expect(() => codec.decode('Hello')).toThrow()
  })

  it('Decoding an unknown value should throw', () => {
    expect(() => codec.decode(90)).toThrow()
  })

  it('Encoding should return ISO string date', () => {
    expect(typeof codec.encode(new Date())).toBe('string')
  })
})
