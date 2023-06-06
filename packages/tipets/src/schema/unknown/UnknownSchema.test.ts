import { UnknownSchema } from './UnknownSchema'

describe('Unknown Schema', () => {
  const schema = UnknownSchema.create()

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
    expect(UnknownSchema.is(schema)).toBe(true)
  })
})
