import {
  AnySchema,
  ArraySchema,
  BooleanSchema,
  DateSchema,
  LiteralSchema,
  NullSchema,
  NullableSchema,
  NumberSchema,
  Schema,
  StringSchema,
  UndefinedSchema,
  _null,
  _undefined,
  any,
  array,
  boolean,
  date,
  literal,
  nullable,
  number,
  string,
} from './schema'
import { intersect } from './schema/intersect/intersect'
import { object } from './schema/object/object'
import { optional } from './schema/optional/optional'
import { tuple } from './schema/tuple/tuple'
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

  describe('Boolean Schema', () => {
    const schema = boolean()

    it('Type Guard', () => {
      expect(schema.is(true)).toBe(true)
      expect(schema.is(false)).toBe(true)
      expect(schema.is(0)).toBe(false)
      expect(schema.is(1)).toBe(false)
      expect(schema.is('true')).toBe(false)
      expect(schema.is('false')).toBe(false)
    })

    it('Instance checking', () => {
      expect(BooleanSchema.is(schema)).toBe(true)
    })
  })

  describe('Date Schema', () => {
    const schema = date()

    it('Type Guard', () => {
      expect(schema.is(new Date())).toBe(true)
      expect(schema.is(Date.now())).toBe(false)
    })

    describe('Validation', () => {
      it('Min', () => {
        const validator = schema.min(new Date(2023, 5, 15))
        expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(0)
        expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(0)
        expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(1)
      })

      it('Max', () => {
        const validator = schema.max(new Date(2023, 5, 15))
        expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(0)
        expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(0)
        expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(1)
      })

      it('Greater', () => {
        const validator = schema.greater(new Date(2023, 5, 15))
        expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(0)
        expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(1)
        expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(1)
      })

      it('Less', () => {
        const validator = schema.less(new Date(2023, 5, 15))
        expect(validator.validate(new Date(2023, 5, 10))).toHaveLength(0)
        expect(validator.validate(new Date(2023, 5, 15))).toHaveLength(1)
        expect(validator.validate(new Date(2023, 5, 20))).toHaveLength(1)
      })
    })

    it('Instance checking', () => {
      expect(DateSchema.is(schema)).toBe(true)
    })
  })

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

  describe('Nullable Schema', () => {
    const schema = nullable(string().length(5).min(5))

    it('Type Guard', () => {
      expect(schema.is('Hello')).toBe(true)
      expect(schema.is(null)).toBe(true)
      expect(schema.is(undefined)).toBe(false)
      expect(schema.is(0)).toBe(false)
      expect(schema.is(false)).toBe(false)
    })

    it('Validation', () => {
      expect(schema.validate('Hello')).toHaveLength(0)
      expect(schema.validate(null)).toHaveLength(0)
      expect(schema.validate('Hell')).toHaveLength(2)
    })

    it('Instance checking', () => {
      expect(NullableSchema.is(schema)).toBe(true)
    })
  })

  describe('Number Schema', () => {
    const schema = number()

    it('Type Guard', () => {
      expect(schema.is(0)).toBe(true)
      expect(schema.is(255)).toBe(true)
      expect(schema.is(-255)).toBe(true)
      expect(schema.is(255.0)).toBe(true)
      expect(schema.is(0xff)).toBe(true)
      expect(schema.is(0b11111111)).toBe(true)
      expect(schema.is(0.255e3)).toBe(true)
      expect(schema.is(NaN)).toBe(true)
      expect(schema.is(Infinity)).toBe(true)
      expect(schema.is(-Infinity)).toBe(true)
      expect(schema.is('0')).toBe(false)
      expect(schema.is('3')).toBe(false)
    })

    describe('Validation', () => {
      it('Min', () => {
        const validator = schema.min(0)
        expect(validator.validate(0)).toHaveLength(0)
        expect(validator.validate(1)).toHaveLength(0)
        expect(validator.validate(Number.MAX_SAFE_INTEGER)).toHaveLength(0)
        expect(validator.validate(-1).length).toBeGreaterThan(0)
        expect(
          validator.validate(Number.MIN_SAFE_INTEGER).length
        ).toBeGreaterThan(0)
      })

      it('Max', () => {
        const validator = schema.max(0)
        expect(validator.validate(0)).toHaveLength(0)
        expect(validator.validate(-1)).toHaveLength(0)
        expect(validator.validate(Number.MIN_SAFE_INTEGER)).toHaveLength(0)
        expect(validator.validate(1).length).toBeGreaterThan(0)
        expect(
          validator.validate(Number.MAX_SAFE_INTEGER).length
        ).toBeGreaterThan(0)
      })

      it('Greater', () => {
        const validator = schema.greater(0)
        expect(validator.validate(1)).toHaveLength(0)
        expect(validator.validate(Number.MAX_SAFE_INTEGER)).toHaveLength(0)
        expect(validator.validate(0).length).toBeGreaterThan(0)
        expect(validator.validate(-1).length).toBeGreaterThan(0)
        expect(
          validator.validate(Number.MIN_SAFE_INTEGER).length
        ).toBeGreaterThan(0)
      })

      it('Less', () => {
        const validator = schema.less(0)
        expect(validator.validate(-1)).toHaveLength(0)
        expect(validator.validate(Number.MIN_SAFE_INTEGER)).toHaveLength(0)
        expect(validator.validate(0).length).toBeGreaterThan(0)
        expect(validator.validate(1).length).toBeGreaterThan(0)
        expect(
          validator.validate(Number.MAX_SAFE_INTEGER).length
        ).toBeGreaterThan(0)
      })

      it('Positive', () => {
        const validator = schema.positive()
        expect(validator.validate(1)).toHaveLength(0)
        expect(validator.validate(Number.MAX_SAFE_INTEGER)).toHaveLength(0)
        expect(validator.validate(0).length).toBeGreaterThan(0)
        expect(validator.validate(-1).length).toBeGreaterThan(0)
        expect(
          validator.validate(Number.MIN_SAFE_INTEGER).length
        ).toBeGreaterThan(0)
      })

      it('Negative', () => {
        const validator = schema.negative()
        expect(validator.validate(-1)).toHaveLength(0)
        expect(validator.validate(Number.MIN_SAFE_INTEGER)).toHaveLength(0)
        expect(validator.validate(0).length).toBeGreaterThan(0)
        expect(validator.validate(1).length).toBeGreaterThan(0)
        expect(
          validator.validate(Number.MAX_SAFE_INTEGER).length
        ).toBeGreaterThan(0)
      })
    })

    it('Instance checking', () => {
      expect(NumberSchema.is(schema)).toBe(true)
    })
  })

  describe('String Schema', () => {
    const schema = string()

    it('Type Guard', () => {
      expect(schema.is('Hello World')).toBe(true)
      expect(schema.is('0')).toBe(true)
      expect(schema.is('false')).toBe(true)
      expect(schema.is(0)).toBe(false)
      expect(schema.is(false)).toBe(false)
    })

    describe('Validation', () => {
      it('Min', () => {
        const validator = schema.min(3)
        expect(validator.validate('username')).toHaveLength(0)
        expect(validator.validate('use')).toHaveLength(0)
        expect(validator.validate('u').length).toBeGreaterThan(0)
        expect(validator.validate('').length).toBeGreaterThan(0)
      })

      it('Max', () => {
        const validator = schema.max(3)
        expect(validator.validate('username').length).toBeGreaterThan(0)
        expect(validator.validate('use')).toHaveLength(0)
        expect(validator.validate('u')).toHaveLength(0)
        expect(validator.validate('')).toHaveLength(0)
      })

      it('Length', () => {
        const validator = schema.length(3)
        expect(validator.validate('username').length).toBeGreaterThan(0)
        expect(validator.validate('use')).toHaveLength(0)
        expect(validator.validate('u').length).toBeGreaterThan(0)
        expect(validator.validate('').length).toBeGreaterThan(0)
      })

      it('Not empty', () => {
        const validator = schema.notEmpty()
        expect(validator.validate('username')).toHaveLength(0)
        expect(validator.validate('use')).toHaveLength(0)
        expect(validator.validate('u')).toHaveLength(0)
        expect(validator.validate('').length).toBeGreaterThan(0)
      })

      it('Pattern', () => {
        const validator = schema.pattern(/^[a-zA-Z0-9]+$/)
        expect(validator.validate('UserName98543')).toHaveLength(0)
        expect(validator.validate('65891238912')).toHaveLength(0)
        expect(validator.validate('').length).toBeGreaterThan(0)
        expect(validator.validate('email@email').length).toBeGreaterThan(0)
        expect(validator.validate('user_name').length).toBeGreaterThan(0)
      })

      it('Alphanumeric', () => {
        const validator = schema.alphanumeric()
        expect(validator.validate('UserName98543')).toHaveLength(0)
        expect(validator.validate('65891238912')).toHaveLength(0)
        expect(validator.validate('').length).toBeGreaterThan(0)
        expect(validator.validate('email@email').length).toBeGreaterThan(0)
        expect(validator.validate('user_name').length).toBeGreaterThan(0)
      })

      // TODO: test other regex preset
    })

    it('Instance checking', () => {
      expect(StringSchema.is(schema)).toBe(true)
    })
  })

  describe('Undefined Schema', () => {
    const schema = _undefined()

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
})
