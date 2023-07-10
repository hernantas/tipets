import { Schema } from './Schema'
import { any } from './any/any'
import { array } from './array/array'
import { boolean } from './boolean/boolean'
import { date } from './date/date'
import { intersect } from './intersect/intersect'
import { literal } from './literal/literal'
import { _null } from './null/null'
import { nullable } from './nullable/nullable'
import { number } from './number/number'
import { object } from './object/object'
import { optional } from './optional/optional'
import { string } from './string/string'
import { tuple } from './tuple/tuple'
import { _undefined } from './undefined/undefined'
import { union } from './union/union'
import { unknown } from './unknown/unknown'

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
