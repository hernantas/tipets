import { BooleanSchema } from './BooleanSchema'
import { boolean } from './boolean'

describe('Boolean Schema', () => {
  const schema = boolean()

  it('Type Guard', () => {
    expect(schema.is(true)).toBe(true)
    expect(schema.is(false)).toBe(true)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
  })

  it('Instance checking', () => {
    expect(BooleanSchema.is(schema)).toBe(true)
  })
})
