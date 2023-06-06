import { AnySchema } from './AnySchema'
import { any } from './any'

describe('Any Schema', () => {
  const schema = any()

  it('Type Guard', () => {
    expect(schema.is(true)).toBe(true)
    expect(schema.is(false)).toBe(true)
    expect(schema.is(0)).toBe(true)
    expect(schema.is(1)).toBe(true)
    expect(schema.is('true')).toBe(true)
    expect(schema.is('false')).toBe(true)
    expect(schema.is(null)).toBe(true)
    expect(schema.is(undefined)).toBe(true)
    expect(schema.is({})).toBe(true)
    expect(schema.is([])).toBe(true)
  })

  it('Instance checking', () => {
    expect(AnySchema.is(schema)).toBe(true)
  })
})
