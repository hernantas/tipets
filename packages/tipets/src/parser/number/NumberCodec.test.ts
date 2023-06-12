import { NumberCodec } from './NumberCodec'

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
