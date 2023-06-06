import { UndefinedSchema } from './UndefinedSchema'

describe('Undefined Schema', () => {
  const schema = UndefinedSchema.create()

  it('Type Guard', () => {
    expect(schema.is(undefined)).toBe(true)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(null)).toBe(false)
    expect(schema.is({})).toBe(false)
    expect(schema.is([])).toBe(false)
  })

  it('Instance checking', () => {
    expect(UndefinedSchema.is(schema)).toBe(true)
  })
})
