import { string } from './string'

describe('String Schema', () => {
  const schema = string()

  it('Type Guard', () => {
    expect(schema.is('Hello World')).toBe(true)
    expect(schema.is('0')).toBe(true)
    expect(schema.is('false')).toBe(true)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(false)).toBe(false)
  })

  describe('Validation', () => {
    it('Min', () => {
      const validator = schema.min(3)
      expect(validator.validate('username')).toHaveLength(0)
      expect(validator.validate('use')).toHaveLength(0)
      expect(validator.validate('u').length).toBeGreaterThan(0)
      expect(validator.validate('').length).toBeGreaterThan(0)
    })

    it('Max', () => {
      const validator = schema.max(3)
      expect(validator.validate('username').length).toBeGreaterThan(0)
      expect(validator.validate('use')).toHaveLength(0)
      expect(validator.validate('u')).toHaveLength(0)
      expect(validator.validate('')).toHaveLength(0)
    })

    it('Length', () => {
      const validator = schema.length(3)
      expect(validator.validate('username').length).toBeGreaterThan(0)
      expect(validator.validate('use')).toHaveLength(0)
      expect(validator.validate('u').length).toBeGreaterThan(0)
      expect(validator.validate('').length).toBeGreaterThan(0)
    })

    it('Not empty', () => {
      const validator = schema.notEmpty()
      expect(validator.validate('username')).toHaveLength(0)
      expect(validator.validate('use')).toHaveLength(0)
      expect(validator.validate('u')).toHaveLength(0)
      expect(validator.validate('').length).toBeGreaterThan(0)
    })

    it('Pattern', () => {
      const validator = schema.pattern(/^[a-zA-Z0-9]+$/)
      expect(validator.validate('UserName98543')).toHaveLength(0)
      expect(validator.validate('65891238912')).toHaveLength(0)
      expect(validator.validate('').length).toBeGreaterThan(0)
      expect(validator.validate('email@email').length).toBeGreaterThan(0)
      expect(validator.validate('user_name').length).toBeGreaterThan(0)
    })

    it('Alphanumeric', () => {
      const validator = schema.alphanumeric()
      expect(validator.validate('UserName98543')).toHaveLength(0)
      expect(validator.validate('65891238912')).toHaveLength(0)
      expect(validator.validate('').length).toBeGreaterThan(0)
      expect(validator.validate('email@email').length).toBeGreaterThan(0)
      expect(validator.validate('user_name').length).toBeGreaterThan(0)
    })

    // TODO: test other regex preset
  })
})
