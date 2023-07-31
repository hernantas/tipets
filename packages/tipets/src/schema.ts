import { Key } from './alias/Key'
import { LiteralType } from './alias/LiteralType'
import { ImmutableBuilder } from './builder'
import { Signature } from './schema/Signature'
import { ValidationRule } from './schema/ValidationRule'
import { Violation } from './schema/Violation'
import { Type, TypeOf, typeSymbol } from './type'

/** Schema definition */
export interface Definition<T> {
  /** Signature for current definition */
  readonly signature: Signature

  /** List of rules for current schema */
  readonly rules?: ValidationRule<T>[]

  readonly [key: Key]: unknown
}

export const kindSymbol = Symbol.for('kind')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Schema<T = any, D extends Definition<T> = Definition<T>>
  extends ImmutableBuilder<D>
  implements Type<T>
{
  public readonly [typeSymbol]!: T

  /** Symbol to determine schema kind unique to its schema type */
  public abstract readonly [kindSymbol]: string

  /**
   * Check if given schema is instance of {@link Schema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link Schema}, false otherwise
   */
  public static is(value: unknown): value is Schema {
    return value instanceof Schema
  }

  protected constructor(definition: D) {
    super(definition)
  }

  /** Get current schema signature */
  public get signature(): Signature {
    return this.get('signature')
  }

  /** Get current validation rules */
  public get rules(): ValidationRule<T>[] {
    return this.get('rules') ?? []
  }

  /**
   * Narrowing down given value into current schema type `T`, can be used for
   * type guard
   *
   * @param value Value to be checked
   */
  public abstract is(value: unknown): value is T

  /**
   * Validate given value
   *
   * @param value Value to be validated
   * @returns Array of violations of violated rules
   */
  public validate(value: T): Violation[] {
    return this.rules
      .filter((constraint) => !constraint.validate(value))
      .map((constraint) => ({
        type: constraint.type,
        message: constraint.message,
        path: constraint.path,
        args: constraint.args,
      }))
  }

  /**
   * Add new validation rules to current rules list
   *
   * @param rule Rule to be added
   * @returns A new instance with new rule added
   */
  public check(rule: ValidationRule<T>): this {
    return this.set('rules', this.rules.concat(rule))
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AnySchema extends Schema<any> {
  public static readonly [kindSymbol]: string = 'any'

  private static readonly instance: AnySchema = new AnySchema({
    signature: AnySchema.signature(),
  })

  public override readonly [kindSymbol]: string = AnySchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link AnySchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link AnySchema}, false otherwise
   */
  public static override is(schema: Schema): schema is AnySchema {
    return schema[kindSymbol] === AnySchema[kindSymbol]
  }

  /**
   * Create new signature for {@link AnySchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Any')
  }

  /**
   * Create new instance of {@link AnySchema}
   *
   * @returns A new instance of {@link AnySchema}
   */
  public static create(): AnySchema {
    return AnySchema.instance
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override is(_value: unknown): _value is any {
    return true
  }
}

/**
 * Create new instance of {@link AnySchema}
 *
 * @returns A new instance of {@link AnySchema}
 */
export function any(): AnySchema {
  return AnySchema.create()
}

export interface ArrayDefinition<S extends Schema>
  extends Definition<TypeOf<S>[]> {
  /** Inner type schema */
  readonly type: S
}

export class ArraySchema<S extends Schema> extends Schema<
  TypeOf<S>[],
  ArrayDefinition<S>
> {
  public static readonly [kindSymbol]: string = 'array'

  public override readonly [kindSymbol]: string = ArraySchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link ArraySchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link ArraySchema}, false otherwise
   */
  public static override is(schema: Schema): schema is ArraySchema<Schema> {
    return schema[kindSymbol] === ArraySchema[kindSymbol]
  }

  /**
   * Create new signature for {@link ArraySchema}
   *
   * @returns A new signature instance
   */
  public static signature(schema: Schema): Signature {
    return Signature.create('Array', schema.signature)
  }

  /**
   * Create new instance of {@link ArraySchema}
   *
   * @param type Inner type schema
   * @returns A new instance of {@link ArraySchema}
   */
  public static create<S extends Schema>(type: S): ArraySchema<S> {
    return new ArraySchema({ signature: ArraySchema.signature(type), type })
  }

  /** Get inner schema type */
  public get type(): S {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<S>[] {
    return (
      Array.isArray(value) &&
      value.reduce<boolean>(
        (result, value) => (result ? this.type.is(value) : false),
        true
      )
    )
  }

  public override validate(value: TypeOf<S>[]): Violation[] {
    return super.validate(value).concat(
      value.flatMap((value, index) =>
        this.type.validate(value).map((error) => ({
          ...error,
          path: [index, ...(error.path ?? [])],
        }))
      )
    )
  }

  /**
   * Add new validation constraint that check minimum array length (`<=`)
   *
   * @param limit Minimum array length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public min(
    limit: number,
    message: string = `must be at least ${limit} length`
  ): this {
    return this.check({
      type: `array.min`,
      args: { limit },
      validate: (value) => value.length >= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check maximum array length (`>=`)
   *
   * @param limit Maximum array length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public max(
    limit: number,
    message: string = `must be at most ${limit} length`
  ): this {
    return this.check({
      type: `array.max`,
      args: { limit },
      validate: (value) => value.length <= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check array length (`=`)
   *
   * @param limit Array length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public length(
    limit: number,
    message: string = `must be at ${limit} length`
  ): this {
    return this.check({
      type: `array.length`,
      args: { limit },
      validate: (value) => value.length === limit,
      message,
    })
  }
}

/**
 * Create new instance of {@link ArraySchema}
 *
 * @param type Inner type schema
 * @returns A new instance of {@link ArraySchema}
 */
export function array<S extends Schema>(type: S): ArraySchema<S> {
  return ArraySchema.create(type)
}

export class BooleanSchema extends Schema<boolean> {
  public static readonly [kindSymbol]: string = 'boolean'

  private static readonly instance: BooleanSchema = new BooleanSchema({
    signature: BooleanSchema.signature(),
  })

  public override readonly [kindSymbol]: string = BooleanSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link BooleanSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link BooleanSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is BooleanSchema {
    return schema[kindSymbol] === BooleanSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link BooleanSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Boolean')
  }

  /**
   * Create new instance of {@link BooleanSchema}
   *
   * @returns A new instance of {@link BooleanSchema}
   */
  public static create(): BooleanSchema {
    return BooleanSchema.instance
  }

  public override is(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }
}

/**
 * Create new instance of {@link BooleanSchema}
 *
 * @returns A new instance of {@link BooleanSchema}
 */
export function boolean(): BooleanSchema {
  return BooleanSchema.create()
}

export class DateSchema extends Schema<Date> {
  public static readonly [kindSymbol]: string = 'date'

  private static readonly instance: DateSchema = new DateSchema({
    signature: DateSchema.signature(),
  })

  public override readonly [kindSymbol]: string = DateSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link DateSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link DateSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is DateSchema {
    return schema[kindSymbol] === DateSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link DateSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Date')
  }

  /**
   * Create new instance of {@link DateSchema}
   *
   * @returns A new instance of {@link DateSchema}
   */
  public static create(): DateSchema {
    return DateSchema.instance
  }

  public override is(value: unknown): value is Date {
    return value instanceof Date
  }

  /**
   * Add new validation constraint that check minimum date (`<=`)
   *
   * @param limit Minimum date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public min(
    limit: Date,
    message: string = `must greater than or equal to ${limit.toISOString()}`
  ): this {
    return this.check({
      type: `date.min`,
      args: { limit },
      validate: (v) => v >= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check maximum date (`<=`)
   *
   * @param limit Maximum date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public max(
    limit: Date,
    message: string = `must be less than or equal to ${limit.toISOString()}`
  ): this {
    return this.check({
      type: `date.max`,
      args: { limit },
      validate: (v) => v <= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check date to be greater than given date
   * (`>`)
   *
   * @param limit Limit date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public greater(
    limit: Date,
    message: string = `must be greater than ${limit.toISOString()}`
  ): this {
    return this.check({
      type: `date.greater`,
      args: { limit },
      validate: (v) => v > limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check date to be less than given date
   * (`<`)
   *
   * @param limit Limit date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public less(
    limit: Date,
    message: string = `must be less than ${limit.toISOString()}`
  ): this {
    return this.check({
      type: `date.less`,
      args: { limit },
      validate: (v) => v < limit,
      message: message,
    })
  }
}

/**
 * Create new instance of {@link DateSchema}
 *
 * @returns A new instance of {@link DateSchema}
 */
export function date(): DateSchema {
  return DateSchema.create()
}

export interface LiteralDefinition<T extends LiteralType>
  extends Definition<T> {
  /** Literal value */
  readonly value: T
}

export class LiteralSchema<T extends LiteralType> extends Schema<
  T,
  LiteralDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'literal'

  public override readonly [kindSymbol]: string = LiteralSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link LiteralSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link LiteralSchema}, false
   *   otherwise
   */
  public static override is(
    schema: Schema
  ): schema is LiteralSchema<LiteralType> {
    return schema[kindSymbol] === LiteralSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link LiteralSchema}
   *
   * @returns A new signature instance
   */
  public static signature(value: LiteralType): Signature {
    return Signature.create(`'${value.toString()}'`)
  }

  /**
   * Create new instance of {@link LiteralSchema}
   *
   * @param value Literal value of schema
   * @returns A new instance of {@link LiteralSchema}
   */
  public static create<T extends LiteralType>(value: T): LiteralSchema<T> {
    return new LiteralSchema({
      signature: LiteralSchema.signature(value),
      value,
    })
  }

  public get value(): T {
    return this.get('value')
  }

  public override is(value: unknown): value is T {
    return this.value === value
  }
}

/**
 * Create new instance of {@link LiteralSchema}
 *
 * @param value Literal value of schema
 * @returns A new instance of {@link LiteralSchema}
 */
export function literal<T extends LiteralType>(value: T): LiteralSchema<T> {
  return LiteralSchema.create(value)
}

export class NullSchema extends Schema<undefined> {
  public static readonly [kindSymbol]: string = 'null'

  private static readonly instance = new NullSchema({
    signature: NullSchema.signature(),
  })

  public override readonly [kindSymbol]: string = NullSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link NullSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link NullSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is NullSchema {
    return schema[kindSymbol] === NullSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link NullSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Null')
  }

  /**
   * Create new instance of {@link NullSchema}
   *
   * @returns A new instance of {@link NullSchema}
   */
  public static create(): NullSchema {
    return NullSchema.instance
  }

  public override is(value: unknown): value is undefined {
    return value === null
  }
}

/**
 * Create new instance of {@link NullSchema}
 *
 * @returns A new instance of {@link NullSchema}
 */
export function _null(): NullSchema {
  return NullSchema.create()
}

export interface NullableDefinition<T extends Schema>
  extends Definition<TypeOf<T> | null> {
  readonly type: T
}

export class NullableSchema<T extends Schema> extends Schema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'nullable'

  public override readonly [kindSymbol]: string = NullableSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link NullableSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link NullableSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is NullableSchema<Schema> {
    return schema[kindSymbol] === NullableSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link NullableSchema}
   *
   * @returns A new signature instance
   */
  public static signature(schema: Schema): Signature {
    return Signature.create('Nullable', schema.signature)
  }

  /**
   * Create new instance of {@link NullableSchema}
   *
   * @param type Inner schema type
   * @returns A new instance of {@link NullableSchema}
   */
  public static create<T extends Schema>(type: T): NullableSchema<T> {
    return new NullableSchema({
      signature: NullableSchema.signature(type),
      type,
    })
  }

  public get type(): T {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<T> | null {
    return value === null || this.type.is(value)
  }

  public override validate(value: TypeOf<T> | null): Violation[] {
    return super
      .validate(value)
      .concat(...(this.type.is(value) ? this.type.validate(value) : []))
  }
}

/**
 * Create new instance of {@link NullableSchema}
 *
 * @param type Inner schema type
 * @returns A new instance of {@link NullableSchema}
 */
export function nullable<T extends Schema>(type: T): NullableSchema<T> {
  return NullableSchema.create(type)
}

export class NumberSchema extends Schema<number> {
  public static readonly [kindSymbol]: string = 'number'

  private static readonly instance: NumberSchema = new NumberSchema({
    signature: NumberSchema.signature(),
  })

  public override readonly [kindSymbol]: string = NumberSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link NumberSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link NumberSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is NumberSchema {
    return schema[kindSymbol] === NumberSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link NumberSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Number')
  }

  /**
   * Create new instance of {@link NumberSchema}
   *
   * @returns A new instance of {@link NumberSchema}
   */
  public static create(): NumberSchema {
    return NumberSchema.instance
  }

  public override is(value: unknown): value is number {
    return typeof value === 'number'
  }

  /**
   * Add new validation constraint that check minimum number (`<=`)
   *
   * @param limit Minimum number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public min(
    limit: number,
    message: string = `must greater than or equal to ${limit}`
  ): this {
    return this.check({
      type: `number.min`,
      args: { limit },
      validate: (v) => v >= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check maximum number (`<=`)
   *
   * @param limit Maximum number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public max(
    limit: number,
    message: string = `must be less than or equal to ${limit}`
  ): this {
    return this.check({
      type: `number.max`,
      args: { limit },
      validate: (v) => v <= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check number to be greater than given
   * number (`>`)
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public greater(
    limit: number,
    message: string = `must be greater than ${limit}`
  ): this {
    return this.check({
      type: `number.greater`,
      args: { limit },
      validate: (v) => v > limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check number to be less than given
   * number (`<`)
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public less(
    limit: number,
    message: string = `must be less than ${limit}`
  ): this {
    return this.check({
      type: `number.less`,
      args: { limit },
      validate: (v) => v < limit,
      message,
    })
  }

  /**
   * Add new validation constraint that number must be positive
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public positive(message: string = `must be positive number`): this {
    return this.check({
      type: `number.positive`,
      validate: (v) => v > 0,
      message,
    })
  }

  /**
   * Add new validation constraint that number must be negative
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public negative(message: string = `must be negative number`): this {
    return this.check({
      type: `number.negative`,
      validate: (v) => v < 0,
      message: message,
    })
  }
}

/**
 * Create new instance of {@link NumberSchema}
 *
 * @returns A new instance of {@link NumberSchema}
 */
export function number(): NumberSchema {
  return NumberSchema.create()
}

const regex = {
  alphanumeric: /^[a-zA-Z0-9]+$/,
  base64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  numeric: /^[0-9]+$/,
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
}

export class StringSchema extends Schema<string> {
  public static readonly [kindSymbol]: string = 'string'

  private static readonly instance: StringSchema = new StringSchema({
    signature: StringSchema.signature(),
  })

  public override readonly [kindSymbol]: string = StringSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link StringSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link StringSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is StringSchema {
    return schema[kindSymbol] === StringSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link StringSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('String')
  }

  /**
   * Create new instance of {@link StringSchema}
   *
   * @returns A new instance of {@link StringSchema}
   */
  public static create(): StringSchema {
    return StringSchema.instance
  }

  public override is(value: unknown): value is string {
    return typeof value === 'string'
  }

  /**
   * Add new validation constraint that check minimum character length (`<=`)
   *
   * @param limit Minimum character length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public min(
    limit: number,
    message: string = `must be more than ${limit} characters`
  ): this {
    return this.check({
      type: `string.min`,
      args: { limit },
      validate: (v) => v.length >= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check maximum character length (`>=`)
   *
   * @param limit Maximum character length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public max(
    limit: number,
    message: string = `must be less than ${limit} characters`
  ): this {
    return this.check({
      type: `string.max`,
      args: { limit },
      validate: (v) => v.length <= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check character length
   *
   * @param limit Character length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public length(
    limit: number,
    message: string = `must be at ${limit} characters`
  ): this {
    return this.check({
      type: `string.length`,
      args: { limit },
      validate: (v) => v.length === limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is empty
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public notEmpty(message: string = `must not empty`): this {
    return this.check({
      type: `string.notEmpty`,
      validate: (v) => v.length > 0,
      message,
    })
  }

  /**
   * Add new validation constraint that check if string match given regex
   * pattern
   *
   * @param pattern Regex pattern for validation
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public pattern(
    pattern: RegExp,
    message: string = `must match "${pattern.source}" pattern`
  ): this {
    return this.check({
      type: `string.pattern`,
      args: { pattern },
      validate: (v) => pattern.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid alphanumeric
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public alphanumeric(message: string = `must be valid alphanumeric`): this {
    return this.check({
      type: `string.alphanumeric`,
      args: { pattern: regex.alphanumeric },
      validate: (v) => regex.alphanumeric.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid base64
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public base64(message: string = `must be valid base64`): this {
    return this.check({
      type: `string.base64`,
      args: { pattern: regex.base64 },
      validate: (v) => regex.base64.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid E-Mail
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public email(message: string = `must be valid email`): this {
    return this.check({
      type: `string.email`,
      args: { pattern: regex.email },
      validate: (v) => regex.email.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid IP character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public ip(message: string = `must be valid ip`): this {
    return this.check({
      type: `string.ip`,
      args: { pattern: regex.ip },
      validate: (v) => regex.ip.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid numeric
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public numeric(
    message: string = `must only contain numeric characters`
  ): this {
    return this.check({
      type: `string.numeric`,
      args: { pattern: regex.numeric },
      validate: (v) => regex.numeric.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid uuid character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public uuid(message: string = `must be valid UUID`): this {
    return this.check({
      type: `string.uuid`,
      args: { pattern: regex.uuid },
      validate: (v) => regex.uuid.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid url character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public url(message: string = `must be valid URL`): this {
    return this.check({
      type: `string.url`,
      args: { pattern: regex.url },
      validate: (v) => regex.url.test(v),
      message,
    })
  }
}

/**
 * Create new instance of {@link StringSchema}
 *
 * @returns A new instance of {@link StringSchema}
 */
export function string(): StringSchema {
  return StringSchema.create()
}
