import { Big } from 'bigdecimal.js'
import { BigDecimalSchema } from './schema'

describe('BigDecimalSchema', () => {
  const schema = BigDecimalSchema.create()

  it('Instance Checking', () => {
    expect(BigDecimalSchema.is(schema)).toBe(true)
  })

  it('Type Guard', () => {
    expect(schema.is(Big('0'))).toBe(true)
    expect(schema.is(0)).toBe(false)
  })

  describe('Validation', () => {
    it('Min', () => {
      const validator = schema.min(Big('0'))
      expect(validator.validate(Big(0))).toHaveLength(0)
      expect(validator.validate(Big(1))).toHaveLength(0)
      expect(validator.validate(Big(-1))).toHaveLength(1)
    })

    it('Max', () => {
      const validator = schema.max(Big('0'))
      expect(validator.validate(Big(0))).toHaveLength(0)
      expect(validator.validate(Big(-1))).toHaveLength(0)
      expect(validator.validate(Big(1))).toHaveLength(1)
    })

    it('Greater Than', () => {
      const validator = schema.greater(Big('0'))
      expect(validator.validate(Big(1))).toHaveLength(0)
      expect(validator.validate(Big(0))).toHaveLength(1)
      expect(validator.validate(Big(-1))).toHaveLength(1)
    })

    it('Lower Than', () => {
      const validator = schema.less(Big('0'))
      expect(validator.validate(Big(-1))).toHaveLength(0)
      expect(validator.validate(Big(0))).toHaveLength(1)
      expect(validator.validate(Big(1))).toHaveLength(1)
    })

    it('Positive', () => {
      const validator = schema.positive()
      expect(validator.validate(Big(1))).toHaveLength(0)
      expect(validator.validate(Big(0))).toHaveLength(1)
      expect(validator.validate(Big(-1))).toHaveLength(1)
    })

    it('Negative', () => {
      const validator = schema.negative()
      expect(validator.validate(Big(-1))).toHaveLength(0)
      expect(validator.validate(Big(0))).toHaveLength(1)
      expect(validator.validate(Big(1))).toHaveLength(1)
    })
  })
})
