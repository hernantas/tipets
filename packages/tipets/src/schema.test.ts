import { AnySchema, ArraySchema, Schema, any, array } from './schema'
import { boolean } from './schema/boolean/boolean'
import { date } from './schema/date/date'
import { intersect } from './schema/intersect/intersect'
import { literal } from './schema/literal/literal'
import { _null } from './schema/null/null'
import { nullable } from './schema/nullable/nullable'
import { number } from './schema/number/number'
import { object } from './schema/object/object'
import { optional } from './schema/optional/optional'
import { string } from './schema/string/string'
import { tuple } from './schema/tuple/tuple'
import { _undefined } from './schema/undefined/undefined'
import { union } from './schema/union/union'
import { unknown } from './schema/unknown/unknown'

describe('Schema', () => {
  it('Schema.is', () => {
    expect(Schema.is(any())).toBe(true)
    expect(Schema.is(array(unknown()))).toBe(true)
    expect(Schema.is(boolean())).toBe(true)
    expect(Schema.is(date())).toBe(true)
    expect(Schema.is(intersect(string(), number()))).toBe(true)
    expect(Schema.is(literal('a'))).toBe(true)
    expect(Schema.is(_null())).toBe(true)
    expect(Schema.is(nullable(unknown()))).toBe(true)
    expect(Schema.is(number())).toBe(true)
    expect(Schema.is(object({}))).toBe(true)
    expect(Schema.is(optional(unknown()))).toBe(true)
    expect(Schema.is(string())).toBe(true)
    expect(Schema.is(tuple(unknown(), unknown()))).toBe(true)
    expect(Schema.is(_undefined())).toBe(true)
    expect(Schema.is(union(string(), number()))).toBe(true)
    expect(Schema.is(unknown())).toBe(true)
    expect(Schema.is(false)).toBe(false)
  })

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

  describe('Array Schema', () => {
    const schema = array(string())

    it('Type Guard', () => {
      expect(schema.is([])).toBe(true)
      expect(schema.is(['ROBOT'])).toBe(true)
      expect(schema.is(['false'])).toBe(true)
      expect(schema.is(['0'])).toBe(true)
      expect(schema.is([false])).toBe(false)
      expect(schema.is([0])).toBe(false)
    })

    it('Instance checking', () => {
      expect(ArraySchema.is(schema)).toBe(true)
    })
  })
})
