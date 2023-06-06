import { string } from '../string/string'
import { NullableSchema } from './NullableSchema'

describe('Nullable Schema', () => {
  const schema = NullableSchema.create(string().length(5).min(5))

  it('Type Guard', () => {
    expect(schema.is('Hello')).toBe(true)
    expect(schema.is(null)).toBe(true)
    expect(schema.is(undefined)).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(false)).toBe(false)
  })

  it('Validation', () => {
    expect(schema.validate('Hello')).toHaveLength(0)
    expect(schema.validate(null)).toHaveLength(0)
    expect(schema.validate('Hell')).toHaveLength(2)
  })

  it('Instance checking', () => {
    expect(NullableSchema.is(schema)).toBe(true)
  })
})
