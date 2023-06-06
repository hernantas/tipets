import { number } from '../number/number'
import { string } from '../string/string'
import { UnionSchema } from './UnionSchema'

describe('Union Schema', () => {
  const schema = UnionSchema.create(string().length(5), number().min(100))

  it('Type Guard', () => {
    expect(schema.is('Hello')).toBe(true)
    expect(schema.is(0)).toBe(true)
    expect(schema.is(false)).toBe(false)
  })

  it('Validation', () => {
    expect(schema.validate('Hello')).toHaveLength(0)
    expect(schema.validate('Hell')).toHaveLength(1)
    expect(schema.validate(100)).toHaveLength(0)
    expect(schema.validate(99)).toHaveLength(1)
  })

  it('Instance checking', () => {
    expect(UnionSchema.is(schema)).toBe(true)
  })
})
