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
