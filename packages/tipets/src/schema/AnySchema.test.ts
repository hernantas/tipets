import { any } from './builder/any'

describe('Any Schema', () => {
  const schema = any()

  it('Is', () => {
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
})
