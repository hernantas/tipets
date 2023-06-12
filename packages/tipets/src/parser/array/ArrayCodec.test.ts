import { StringCodec } from '../string/StringCodec'
import { ArrayCodec } from './ArrayCodec'

describe('ArrayCodec', () => {
  const codec = new ArrayCodec(new StringCodec())

  it('Decoding an array must return array', () => {
    expect(codec.decode(['h', 'e', 'l', 'l', 'o'])).toHaveLength(5)
  })

  it('Decoding an array must also decode the content', () => {
    const numbers = codec.decode([0, 1, 2, 3, 4])
    expect(numbers).toHaveLength(5)
    expect(numbers).toStrictEqual(['0', '1', '2', '3', '4'])
  })

  it('Decoding non-array should convert it to single array length', () => {
    const str = codec.decode('Hello')
    expect(str).toHaveLength(1)
    expect(str).toStrictEqual(['Hello'])
  })

  it('Decoding null or undefined should return empty array', () => {
    expect(codec.decode(null)).toHaveLength(0)
    expect(codec.decode(undefined)).toHaveLength(0)
  })

  it('Encode should return array', () => {
    expect(codec.encode(['0', '1', '2', '3', '4'])).toHaveLength(5)
  })
})
