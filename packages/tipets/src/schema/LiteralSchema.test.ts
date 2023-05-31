import { literal } from './builder/literal'

describe('Literal Schema', () => {
  describe('String', () => {
    const schema = literal('true')
    it('Is', () => {
      expect(schema.is('true')).toBe(true)
      expect(schema.is('false')).toBe(false)
      expect(schema.is(true)).toBe(false)
      expect(schema.is(false)).toBe(false)
      expect(schema.is(0)).toBe(false)
      expect(schema.is(1)).toBe(false)
    })
  })

  describe('Number', () => {
    const schema = literal(0)
    it('Is', () => {
      expect(schema.is(0)).toBe(true)
      expect(schema.is(1)).toBe(false)
      expect(schema.is('true')).toBe(false)
      expect(schema.is('false')).toBe(false)
      expect(schema.is(true)).toBe(false)
      expect(schema.is(false)).toBe(false)
    })
  })

  describe('Boolean', () => {
    const schema = literal(true)
    it('Is', () => {
      expect(schema.is(true)).toBe(true)
      expect(schema.is(false)).toBe(false)
      expect(schema.is('true')).toBe(false)
      expect(schema.is('false')).toBe(false)
      expect(schema.is(0)).toBe(false)
      expect(schema.is(1)).toBe(false)
    })
  })
})
