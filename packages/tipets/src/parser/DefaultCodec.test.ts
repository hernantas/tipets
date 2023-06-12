import { string } from '../schema/string/string'
import { DefaultCodec } from './DefaultCodec'

describe('DefaultCodec', () => {
  const codec = new DefaultCodec(string())

  it('Decode should return the value if the type is match with the schema', () => {
    expect(codec.decode('Hello')).toBe('Hello')
  })

  it('Decode should throw if the type is match with the schema', () => {
    expect(() => codec.decode(0)).toThrow()
    expect(() => codec.decode(undefined)).toThrow()
  })

  it('Encode should return as is', () => {
    expect(codec.encode('Hello')).toBe('Hello')
  })
})
