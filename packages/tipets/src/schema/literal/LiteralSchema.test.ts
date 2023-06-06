import { LiteralSchema } from './LiteralSchema'

describe('Literal Schema', () => {
  it('Type Guard (String)', () => {
    const schema = LiteralSchema.create('true')
    expect(schema.is('true')).toBe(true)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
  })

  it('Type Guard (Number)', () => {
    const schema = LiteralSchema.create(0)
    expect(schema.is(0)).toBe(true)
    expect(schema.is(1)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
  })

  it('Type Guard (Boolean)', () => {
    const schema = LiteralSchema.create(true)
    expect(schema.is(true)).toBe(true)
    expect(schema.is(false)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
  })

  it('Instance checking', () => {
    const schema = LiteralSchema.create(true)
    expect(LiteralSchema.is(schema)).toBe(true)
  })
})
