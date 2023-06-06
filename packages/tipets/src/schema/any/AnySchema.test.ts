import { AnySchema } from './AnySchema'

describe('Any Schema', () => {
  const schema = AnySchema.create()

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
