import { NumberSchema } from './NumberSchema'

describe('Number Schema', () => {
  const schema = NumberSchema.create()

  it('Type Guard', () => {
    expect(schema.is(0)).toBe(true)
    expect(schema.is(255)).toBe(true)
    expect(schema.is(-255)).toBe(true)
    expect(schema.is(255.0)).toBe(true)
    expect(schema.is(0xff)).toBe(true)
    expect(schema.is(0b11111111)).toBe(true)
    expect(schema.is(0.255e3)).toBe(true)
    expect(schema.is(NaN)).toBe(true)
    expect(schema.is(Infinity)).toBe(true)
    expect(schema.is(-Infinity)).toBe(true)
    expect(schema.is('0')).toBe(false)
    expect(schema.is('3')).toBe(false)
  })

  describe('Validation', () => {
    it('Min', () => {
      const validator = schema.min(0)
      expect(validator.validate(0)).toHaveLength(0)
      expect(validator.validate(1)).toHaveLength(0)
      expect(validator.validate(Number.MAX_SAFE_INTEGER)).toHaveLength(0)
      expect(validator.validate(-1).length).toBeGreaterThan(0)
      expect(
        validator.validate(Number.MIN_SAFE_INTEGER).length
      ).toBeGreaterThan(0)
    })

    it('Max', () => {
      const validator = schema.max(0)
      expect(validator.validate(0)).toHaveLength(0)
      expect(validator.validate(-1)).toHaveLength(0)
      expect(validator.validate(Number.MIN_SAFE_INTEGER)).toHaveLength(0)
      expect(validator.validate(1).length).toBeGreaterThan(0)
      expect(
        validator.validate(Number.MAX_SAFE_INTEGER).length
      ).toBeGreaterThan(0)
    })

    it('Greater', () => {
      const validator = schema.greater(0)
      expect(validator.validate(1)).toHaveLength(0)
      expect(validator.validate(Number.MAX_SAFE_INTEGER)).toHaveLength(0)
      expect(validator.validate(0).length).toBeGreaterThan(0)
      expect(validator.validate(-1).length).toBeGreaterThan(0)
      expect(
        validator.validate(Number.MIN_SAFE_INTEGER).length
      ).toBeGreaterThan(0)
    })

    it('Less', () => {
      const validator = schema.less(0)
      expect(validator.validate(-1)).toHaveLength(0)
      expect(validator.validate(Number.MIN_SAFE_INTEGER)).toHaveLength(0)
      expect(validator.validate(0).length).toBeGreaterThan(0)
      expect(validator.validate(1).length).toBeGreaterThan(0)
      expect(
        validator.validate(Number.MAX_SAFE_INTEGER).length
      ).toBeGreaterThan(0)
    })

    it('Positive', () => {
      const validator = schema.positive()
      expect(validator.validate(1)).toHaveLength(0)
      expect(validator.validate(Number.MAX_SAFE_INTEGER)).toHaveLength(0)
      expect(validator.validate(0).length).toBeGreaterThan(0)
      expect(validator.validate(-1).length).toBeGreaterThan(0)
      expect(
        validator.validate(Number.MIN_SAFE_INTEGER).length
      ).toBeGreaterThan(0)
    })

    it('Negative', () => {
      const validator = schema.negative()
      expect(validator.validate(-1)).toHaveLength(0)
      expect(validator.validate(Number.MIN_SAFE_INTEGER)).toHaveLength(0)
      expect(validator.validate(0).length).toBeGreaterThan(0)
      expect(validator.validate(1).length).toBeGreaterThan(0)
      expect(
        validator.validate(Number.MAX_SAFE_INTEGER).length
      ).toBeGreaterThan(0)
    })
  })

  it('Instance checking', () => {
    expect(NumberSchema.is(schema)).toBe(true)
  })
})
