import { Schema } from './schema'
import { any } from './schema/any/any'
import { array } from './schema/array/array'
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
})
