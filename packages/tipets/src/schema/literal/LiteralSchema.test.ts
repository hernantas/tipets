import { literal } from './literal'

describe('Literal Schema', () => {
  it('Is (String)', () => {
    const schema = literal('true')
    expect(schema.is('true')).toBe(true)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
  })

  it('Is (Number)', () => {
    const schema = literal(0)
    expect(schema.is(0)).toBe(true)
    expect(schema.is(1)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(true)).toBe(false)
    expect(schema.is(false)).toBe(false)
  })

  it('Is (Boolean)', () => {
    const schema = literal(true)
    expect(schema.is(true)).toBe(true)
    expect(schema.is(false)).toBe(false)
    expect(schema.is('true')).toBe(false)
    expect(schema.is('false')).toBe(false)
    expect(schema.is(0)).toBe(false)
    expect(schema.is(1)).toBe(false)
  })
})
