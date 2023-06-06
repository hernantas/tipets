import { string } from '../string/string'
import { OptionalSchema } from './OptionalSchema'
import { optional } from './optional'

describe('Optional Schema', () => {
  const schema = optional(string().length(5).min(5))

  it('Type Guard', () => {
    expect(schema.is('Hello')).toBe(true)
    expect(schema.is(undefined)).toBe(true)
    expect(schema.is(null)).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(false)).toBe(false)
  })

  it('Validation', () => {
    expect(schema.validate('Hello')).toHaveLength(0)
    expect(schema.validate(undefined)).toHaveLength(0)
    expect(schema.validate('Hell')).toHaveLength(2)
  })

  it('Instance checking', () => {
    expect(OptionalSchema.is(schema)).toBe(true)
  })
})
