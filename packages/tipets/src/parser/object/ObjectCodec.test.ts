import { NumberCodec } from '../number/NumberCodec'
import { StringCodec } from '../string/StringCodec'
import { ObjectCodec } from './ObjectCodec'

describe('ObjectCodec', () => {
  const codec = new ObjectCodec({
    id: new NumberCodec(),
    name: new StringCodec(),
  })

  it('Decoding should decode based on its properties', () => {
    expect(
      codec.decode({
        id: 1,
        name: 'Hello',
      })
    ).toStrictEqual({
      id: 1,
      name: 'Hello',
    })
    expect(
      codec.decode({
        id: '1',
        name: 'Hello',
      })
    ).toStrictEqual({
      id: 1,
      name: 'Hello',
    })
  })

  it('Decoding with insufficient properties should still decode accordingly', () => {
    expect(
      codec.decode({
        id: 1,
      })
    ).toStrictEqual({
      id: 1,
      name: '',
    })
  })

  it('Decoding with excess properties should trim the properties', () => {
    expect(
      codec.decode({
        id: 1,
        name: 'Hello',
        active: true,
      })
    ).toStrictEqual({
      id: 1,
      name: 'Hello',
    })
  })

  it('Encoding should encode based on its properties', () => {
    expect(
      codec.encode({
        id: 1,
        name: 'Hello',
      })
    ).toStrictEqual({
      id: 1,
      name: 'Hello',
    })
  })
})
