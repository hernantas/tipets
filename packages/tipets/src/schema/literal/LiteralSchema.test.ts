import { LiteralSchema } from './LiteralSchema'
import { literal } from './literal'

describe('Literal Schema', () => {
  it('Type Guard (String)', () => {
    const schema = literal('true')
    expect(schema.is('true')).toBe(true)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
  })

  it('Type Guard (Number)', () => {
    const schema = literal(0)
    expect(schema.is(0)).toBe(true)
    expect(schema.is(1)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
  })

  it('Type Guard (Boolean)', () => {
    const schema = literal(true)
    expect(schema.is(true)).toBe(true)
    expect(schema.is(false)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
  })

  it('Instance checking', () => {
    const schema = literal(true)
    expect(LiteralSchema.is(schema)).toBe(true)
  })
})
