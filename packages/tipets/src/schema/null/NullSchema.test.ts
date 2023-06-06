import { NullSchema } from './NullSchema'
import { _null } from './null'

describe('Null Schema', () => {
  const schema = _null()

  it('Type Guard', () => {
    expect(schema.is(null)).toBe(true)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(undefined)).toBe(false)
    expect(schema.is({})).toBe(false)
    expect(schema.is([])).toBe(false)
  })

  it('Instance checking', () => {
    expect(NullSchema.is(schema)).toBe(true)
  })
})
