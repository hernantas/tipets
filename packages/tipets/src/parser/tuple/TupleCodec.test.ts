import { NumberCodec } from '../number/NumberCodec'
import { StringCodec } from '../string/StringCodec'
import { TupleCodec } from './TupleCodec'

describe('TupleCodec', () => {
  const codec = new TupleCodec(new StringCodec(), new NumberCodec())

  it('Decoding should decode following the tuple pattern', () => {
    expect(codec.decode(['Hello', '0'])).toStrictEqual(['Hello', 0])
    expect(codec.decode(['Hello', 0])).toStrictEqual(['Hello', 0])
    expect(codec.decode([0, 0])).toStrictEqual(['0', 0])
  })

  it('Encoding should encode following the tuple pattern', () => {
    expect(codec.encode(['Hello', 0])).toStrictEqual(['Hello', 0])
  })
})
