import { NumberCodec } from '../number/NumberCodec'
import { ObjectCodec } from '../object/ObjectCodec'
import { StringCodec } from '../string/StringCodec'
import { IntersectCodec } from './IntersectCodec'

describe('IntersectCodec', () => {
  const codec = new IntersectCodec(
    new ObjectCodec({ id: new NumberCodec() }),
    new ObjectCodec({ name: new StringCodec() })
  )

  it('Decoding should merge the result', () => {
    expect(codec.decode({ id: 1, name: 'Hello' })).toStrictEqual({
      id: 1,
      name: 'Hello',
    })
    expect(codec.decode({ id: '1', name: 'Hello' })).toStrictEqual({
      id: 1,
      name: 'Hello',
    })
  })

  it('Encoding should merge the result', () => {
    expect(codec.encode({ id: 1, name: 'Hello' })).toStrictEqual({
      id: 1,
      name: 'Hello',
    })
  })
})
