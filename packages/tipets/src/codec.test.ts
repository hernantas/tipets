import {
  ArrayCodec,
  BooleanCodec,
  DateCodec,
  DefaultCodec,
  IntersectCodec,
  LiteralCodec,
  NullableCodec,
  NumberCodec,
  ObjectCodec,
  OptionalCodec,
  StringCodec,
  TupleCodec,
  UnionCodec,
} from './codec'
import { number, string } from './schema'

describe('Codec', () => {
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

  describe('BooleanCodec', () => {
    const codec = new BooleanCodec()

    it('Decode falsy value must return false', () => {
      expect(codec.decode(null)).toBe(false)
      expect(codec.decode(undefined)).toBe(false)
      expect(codec.decode(false)).toBe(false)
      expect(codec.decode(NaN)).toBe(false)
      expect(codec.decode(0)).toBe(false)
      expect(codec.decode(-0)).toBe(false)
      expect(codec.decode('')).toBe(false)
    })

    it('Encode must return boolean', () => {
      expect(codec.encode(false)).toBe(false)
    })
  })

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

  describe('NumberCodec', () => {
    const codec = new NumberCodec()

    it('Decode number must return number', () => {
      expect(codec.decode(0)).toBe(0)
      expect(codec.decode(-0)).toBe(-0)
      expect(codec.decode(1)).toBe(1)
      expect(codec.decode(-1)).toBe(-1)
      expect(codec.decode(Infinity)).toBe(Infinity)
      expect(codec.decode(-Infinity)).toBe(-Infinity)
      expect(codec.decode(NaN)).toBeNaN()
      expect(codec.decode(-NaN)).toBeNaN()
    })

    it('Decode string with valid number value must return number', () => {
      expect(codec.decode('0')).toBe(0)
      expect(codec.decode('-0')).toBe(-0)
      expect(codec.decode('1')).toBe(1)
      expect(codec.decode('-1')).toBe(-1)
      expect(codec.decode('Infinity')).toBe(Infinity)
      expect(codec.decode('-Infinity')).toBe(-Infinity)
      expect(codec.decode('NaN')).toBeNaN()
      expect(codec.decode('-NaN')).toBeNaN()
    })

    it('Decode falsy value must return 0 number', () => {
      expect(codec.decode('')).toBe(0)
      expect(codec.decode(false)).toBe(0)
      expect(codec.decode(null)).toBe(0)
      expect(codec.decode(undefined)).toBe(0)
    })

    it('Decode non-number must return NaN', () => {
      expect(codec.decode('Hello')).toBeNaN()
    })
  })

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

  describe('UnionCodec', () => {
    const codec = new UnionCodec(
      {
        is: (value): value is number => number().is(value),
        codec: new NumberCodec(),
      },
      {
        is: (value): value is string => string().is(value),
        codec: new StringCodec(),
      }
    )

    it('Decoding should try to decode using all available codec', () => {
      expect(codec.decode(0)).toBe(0)
      expect(codec.decode('0')).toBe('0')
      expect(codec.decode('Hello')).toBe('Hello')
    })

    it('Encoding should try to encode using all available codec', () => {
      expect(codec.encode(0)).toBe(0)
      expect(codec.encode('0')).toBe('0')
      expect(codec.encode('Hello')).toBe('Hello')
    })
  })
})
