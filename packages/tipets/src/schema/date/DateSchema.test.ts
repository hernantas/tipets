import { DateSchema } from './DateSchema'
import { date } from './date'

describe('Date Schema', () => {
  const schema = date()

  it('Type Guard', () => {
    expect(schema.is(new Date())).toBe(true)
    expect(schema.is(Date.now())).toBe(false)
  })

  describe('Validation', () => {
    it('Min', () => {
      const validator = schema.min(new Date(2023, 5, 15))
      expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(0)
      expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(0)
      expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(1)
    })

    it('Max', () => {
      const validator = schema.max(new Date(2023, 5, 15))
      expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(0)
      expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(0)
      expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(1)
    })

    it('Greater', () => {
      const validator = schema.greater(new Date(2023, 5, 15))
      expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(0)
      expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(1)
      expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(1)
    })

    it('Less', () => {
      const validator = schema.less(new Date(2023, 5, 15))
      expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(0)
      expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(1)
      expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(1)
    })
  })

  it('Instance checking', () => {
    expect(DateSchema.is(schema)).toBe(true)
  })
})
