import { ImmutableBuilder } from './builder'
import { Signature } from './signature'
import { Type, TypeMapOf, TypeOf, typeSymbol } from './type'
import {
  Key,
  LiteralType,
  MemberType,
  ObjectType,
  TupleType,
} from './type-alias'
import { IntersectMap, Merge, ShapeType, UnionMap } from './type-helper'
import { ValidationRule } from './validation'
import { Violation } from './violation'

/** Schema definition */
export interface Definition {
  /** Signature for current definition */
  readonly signature: Signature

  /** List of rules for current schema */
  readonly rules?: ValidationRule[]

  readonly [key: Key]: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Schema<T = any, D extends Definition = Definition>
  extends ImmutableBuilder<D>
  implements Type<T>
{
  /**
   * Check if given schema is instance of {@link Schema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link Schema}, false otherwise
   */
  public static is(value: unknown): value is Schema {
    return value instanceof Schema
  }

  public readonly [typeSymbol]!: T

  /** Symbol to determine schema kind unique to its schema type */
  public abstract readonly kind: string

  protected constructor(definition: D) {
    super(definition)
  }

  /** Get current schema signature */
  public get signature(): Signature {
    return this.get('signature')
  }

  /** Get current validation rules */
  public get rules(): ValidationRule[] {
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
    return this.set('rules', this.rules.concat(rule as ValidationRule))
  }

  public array(): ArraySchema<this> {
    return array(this)
  }

  public optional(): OptionalSchema<this> {
    return optional(this)
  }

  public nullable(): NullableSchema<this> {
    return nullable(this)
  }

  public nullish(): OptionalSchema<NullableSchema<this>> {
    return optional(nullable(this))
  }
}

export interface InnerDefinition<S extends Schema> extends Definition {
  /** Inner type schema */
  readonly type: S
}

export type MemberSchemaType = MemberType<Schema>

export type ObjectSchemaType = ObjectType<Schema>

export type TupleSchemaType = TupleType<Schema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AnySchema extends Schema<any> {
  public static readonly kind: string = 'any'

  private static readonly instance: AnySchema = new AnySchema({
    signature: AnySchema.signature(),
  })

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

  /**
   * Check if given schema is instance of {@link AnySchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link AnySchema}, false otherwise
   */
  public static override is(schema: Schema): schema is AnySchema {
    return schema.kind === AnySchema.kind
  }

  public override readonly kind: string = AnySchema.kind

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

export class ArraySchema<S extends Schema> extends Schema<
  TypeOf<S>[],
  InnerDefinition<S>
> {
  public static readonly kind: string = 'array'

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

  /**
   * Check if given schema is instance of {@link ArraySchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link ArraySchema}, false otherwise
   */
  public static override is(schema: Schema): schema is ArraySchema<Schema> {
    return schema.kind === ArraySchema.kind
  }

  public override readonly kind: string = ArraySchema.kind

  /** Get inner schema type */
  public get innerType(): S {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<S>[] {
    return (
      Array.isArray(value) &&
      value.reduce<boolean>(
        (result, value) => (result ? this.innerType.is(value) : false),
        true
      )
    )
  }

  public override validate(value: TypeOf<S>[]): Violation[] {
    return super.validate(value).concat(
      value.flatMap((value, index) =>
        this.innerType.validate(value).map((error) => ({
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
  public static readonly kind: string = 'boolean'

  private static readonly instance: BooleanSchema = new BooleanSchema({
    signature: BooleanSchema.signature(),
  })

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

  /**
   * Check if given schema is instance of {@link BooleanSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link BooleanSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is BooleanSchema {
    return schema.kind === BooleanSchema.kind
  }

  public override readonly kind: string = BooleanSchema.kind

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
  public static readonly kind: string = 'date'

  private static readonly instance: DateSchema = new DateSchema({
    signature: DateSchema.signature(),
  })

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

  /**
   * Check if given schema is instance of {@link DateSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link DateSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is DateSchema {
    return schema.kind === DateSchema.kind
  }

  public override readonly kind: string = DateSchema.kind

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

export interface IntersectDefinition<T extends MemberSchemaType>
  extends Definition {
  readonly items: T
}

export class IntersectSchema<T extends MemberSchemaType> extends Schema<
  IntersectMap<TypeMapOf<T>>,
  IntersectDefinition<T>
> {
  public static readonly kind: string = 'intersect'

  /**
   * Create new signature for {@link IntersectSchema}
   *
   * @returns A new signature instance
   */
  public static signature(items: MemberSchemaType): Signature {
    return Signature.create('Intersect', ...items.map((item) => item.signature))
  }

  /**
   * Create new instance of {@link IntersectSchema}
   *
   * @param items Member type schema
   * @returns A new instance of {@link IntersectSchema}
   */
  public static create<T extends MemberSchemaType>(
    ...items: T
  ): IntersectSchema<T> {
    return new IntersectSchema({
      signature: IntersectSchema.signature(items),
      items,
    })
  }

  /**
   * Check if given schema is instance of {@link IntersectSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link IntersectSchema}, false
   *   otherwise
   */
  public static override is(
    schema: Schema
  ): schema is IntersectSchema<MemberSchemaType> {
    return schema.kind === IntersectSchema.kind
  }

  public override readonly kind: string = IntersectSchema.kind

  public get items(): T {
    return this.get('items')
  }

  public override is(value: unknown): value is IntersectMap<TypeMapOf<T>> {
    return this.items.reduce(
      (result, schema) => result && schema.is(value),
      true
    )
  }

  public override validate(value: IntersectMap<TypeMapOf<T>>): Violation[] {
    return super
      .validate(value)
      .concat(this.items.flatMap((item) => item.validate(value)))
  }
}

/**
 * Create new instance of {@link IntersectSchema}
 *
 * @param items Member type schema
 * @returns A new instance of {@link IntersectSchema}
 */
export function intersect<T extends MemberSchemaType>(
  ...items: T
): IntersectSchema<T> {
  return IntersectSchema.create(...items)
}

export interface LiteralDefinition<T extends LiteralType> extends Definition {
  /** Literal value */
  readonly value: T
}

export class LiteralSchema<T extends LiteralType> extends Schema<
  T,
  LiteralDefinition<T>
> {
  public static readonly kind: string = 'literal'

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
    return schema.kind === LiteralSchema.kind
  }

  public override readonly kind: string = LiteralSchema.kind

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
  public static readonly kind: string = 'null'

  private static readonly instance = new NullSchema({
    signature: NullSchema.signature(),
  })

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

  /**
   * Check if given schema is instance of {@link NullSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link NullSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is NullSchema {
    return schema.kind === NullSchema.kind
  }

  public override readonly kind: string = NullSchema.kind

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

export class NullableSchema<T extends Schema> extends Schema<
  TypeOf<T> | null,
  InnerDefinition<T>
> {
  public static readonly kind: string = 'nullable'

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

  /**
   * Check if given schema is instance of {@link NullableSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link NullableSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is NullableSchema<Schema> {
    return schema.kind === NullableSchema.kind
  }

  public override readonly kind: string = NullableSchema.kind

  public get innerType(): T {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<T> | null {
    return value === null || this.innerType.is(value)
  }

  public override validate(value: TypeOf<T> | null): Violation[] {
    return super
      .validate(value)
      .concat(
        ...(this.innerType.is(value) ? this.innerType.validate(value) : [])
      )
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
  public static readonly kind: string = 'number'

  private static readonly instance: NumberSchema = new NumberSchema({
    signature: NumberSchema.signature(),
  })

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

  /**
   * Check if given schema is instance of {@link NumberSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link NumberSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is NumberSchema {
    return schema.kind === NumberSchema.kind
  }

  public override readonly kind: string = NumberSchema.kind

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

export type OptionalSchemaMap<T extends ObjectSchemaType> = {
  [K in keyof T]: OptionalSchema<T[K]>
}

export interface ObjectDefinition<T extends ObjectSchemaType>
  extends Definition {
  readonly properties: T
}

export class ObjectSchema<S extends ObjectSchemaType> extends Schema<
  ShapeType<TypeMapOf<S>>,
  ObjectDefinition<S>
> {
  public static readonly kind: string = 'object'

  /**
   * Create new signature for {@link ObjectSchema}
   *
   * @returns A new signature instance
   */
  public static signature(properties: ObjectSchemaType): Signature {
    return Object.entries(properties).reduce(
      (result, [key, schema]) => result.property(key, schema.signature),
      Signature.create('Object')
    )
  }

  /**
   * Create new instance of {@link ObjectSchema}
   *
   * @param properties Properties of object schema
   * @returns A new instance of {@link ObjectSchema}
   */
  public static create<T extends ObjectSchemaType>(
    properties: T
  ): ObjectSchema<T> {
    return new ObjectSchema({
      signature: ObjectSchema.signature(properties),
      properties,
    })
  }

  /**
   * Check if given schema is instance of {@link ObjectSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link ObjectSchema}, false otherwise
   */
  public static override is(
    schema: Schema
  ): schema is ObjectSchema<ObjectSchemaType> {
    return schema.kind === ObjectSchema.kind
  }

  public override readonly kind: string = ObjectSchema.kind

  /** Get list of keys of schema */
  public get keys(): string[] {
    return Object.keys(this.properties)
  }

  /** Get properties of schema */
  public get properties(): S {
    return this.get('properties')
  }

  /** Get properties of schema */
  public get props(): S {
    return this.get('properties')
  }

  public override is(value: unknown): value is ShapeType<TypeMapOf<S>> {
    return (
      typeof value === 'object' &&
      value !== null &&
      Object.entries(this.properties).reduce(
        (result, [key, schema]) =>
          result && schema.is((value as TypeMapOf<S>)[key]),
        true
      )
    )
  }

  public override validate(value: ShapeType<TypeMapOf<S>>): Violation[] {
    return super
      .validate(value)
      .concat(
        Object.entries(this.properties).flatMap(([key, schema]) =>
          schema
            .validate(value[key as keyof ShapeType<TypeMapOf<S>>])
            .map((error) => ({ ...error, path: [key, ...(error.path ?? [])] }))
        )
      )
  }

  public extend<U extends ObjectSchemaType>(
    extension: U
  ): ObjectSchema<Merge<S, U>> {
    return ObjectSchema.create(
      Object.fromEntries([
        ...Object.entries(this.properties),
        ...Object.entries(extension),
      ]) as Merge<S, U>
    )
  }

  public partial(): ObjectSchema<OptionalSchemaMap<S>> {
    return ObjectSchema.create(
      Object.fromEntries(
        Object.entries(this.properties).map(([key, schema]) => [
          key,
          optional(schema),
        ])
      ) as unknown as OptionalSchemaMap<S>
    )
  }

  public pick<K extends keyof S>(...keys: K[]): ObjectSchema<Pick<S, K>> {
    return ObjectSchema.create(
      Object.fromEntries(
        Object.entries(this.properties)
          .filter(([key]) => keys.includes(key as K))
          .map(([key, schema]) => [key, schema])
      ) as Pick<S, K>
    )
  }

  public omit<K extends keyof S>(...keys: K[]): ObjectSchema<Omit<S, K>> {
    return ObjectSchema.create(
      Object.fromEntries(
        Object.entries(this.properties)
          .filter(([key]) => !keys.includes(key as K))
          .map(([key, schema]) => [key, schema])
      ) as Omit<S, K>
    )
  }
}

/**
 * Create new instance of {@link ObjectSchema}
 *
 * @param properties Properties of object schema
 * @returns A new instance of {@link ObjectSchema}
 */
export function object<T extends ObjectSchemaType>(
  properties: T
): ObjectSchema<T> {
  return ObjectSchema.create(properties)
}

export class OptionalSchema<T extends Schema> extends Schema<
  TypeOf<T> | undefined,
  InnerDefinition<T>
> {
  public static readonly kind: string = 'optional'

  /**
   * Create new signature for {@link OptionalSchema}
   *
   * @returns A new signature instance
   */
  public static signature(type: Schema): Signature {
    return Signature.create('Optional', type.signature)
  }

  /**
   * Create new instance of {@link OptionalSchema}
   *
   * @param type Inner schema type
   * @returns A new instance of {@link OptionalSchema}
   */
  public static create<T extends Schema>(type: T): OptionalSchema<T> {
    return new OptionalSchema({
      signature: OptionalSchema.signature(type),
      type,
    })
  }

  /**
   * Check if given schema is instance of {@link OptionalSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link OptionalSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is OptionalSchema<Schema> {
    return schema.kind === OptionalSchema.kind
  }

  public override readonly kind: string = OptionalSchema.kind

  public get innerType(): T {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<T> | undefined {
    return value === undefined || this.innerType.is(value)
  }

  public override validate(value: TypeOf<T> | undefined): Violation[] {
    return super
      .validate(value)
      .concat(
        ...(this.innerType.is(value) ? this.innerType.validate(value) : [])
      )
  }
}

/**
 * Create new instance of {@link OptionalSchema}
 *
 * @param type Inner schema type
 * @returns A new instance of {@link OptionalSchema}
 */
export function optional<T extends Schema>(type: T): OptionalSchema<T> {
  return OptionalSchema.create(type)
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
  public static readonly kind: string = 'string'

  private static readonly instance: StringSchema = new StringSchema({
    signature: StringSchema.signature(),
  })

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

  /**
   * Check if given schema is instance of {@link StringSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link StringSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is StringSchema {
    return schema.kind === StringSchema.kind
  }

  public override readonly kind: string = StringSchema.kind

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

export interface TupleDefinition<T extends TupleSchemaType> extends Definition {
  readonly items: T
}

export class TupleSchema<T extends TupleSchemaType> extends Schema<
  TypeMapOf<T>,
  TupleDefinition<T>
> {
  public static readonly kind: string = 'tuple'

  /**
   * Create new signature for {@link TupleSchema}
   *
   * @returns A new signature instance
   */
  public static signature(items: TupleSchemaType): Signature {
    return Signature.create('Tuple', ...items.map((item) => item.signature))
  }

  /**
   * Create new instance of {@link TupleSchema}
   *
   * @param items Member schemas
   * @returns A new instance of {@link TupleSchema}
   */
  public static create<T extends TupleSchemaType>(...items: T): TupleSchema<T> {
    return new TupleSchema({ signature: TupleSchema.signature(items), items })
  }

  /**
   * Check if given schema is instance of {@link TupleSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link TupleSchema}, false otherwise
   */
  public static override is(
    schema: Schema
  ): schema is TupleSchema<TupleSchemaType> {
    return schema.kind === TupleSchema.kind
  }

  public override readonly kind: string = TupleSchema.kind

  public get items(): T {
    return this.get('items')
  }

  public override is(value: unknown): value is TypeMapOf<T> {
    return (
      Array.isArray(value) &&
      this.items.length === value.length &&
      this.items.reduce(
        (result, schema, index) => (result ? schema.is(value[index]) : false),
        true
      )
    )
  }

  public override validate(value: TypeMapOf<T>): Violation[] {
    return super.validate(value).concat(
      this.items.flatMap((item, index) =>
        item.validate(value[index]).map((error) => ({
          ...error,
          path: [index, ...(error.path ?? [])],
        }))
      )
    )
  }
}

/**
 * Create new instance of {@link TupleSchema}
 *
 * @param items Member schemas
 * @returns A new instance of {@link TupleSchema}
 */
export function tuple<T extends TupleSchemaType>(...items: T): TupleSchema<T> {
  return TupleSchema.create(...items)
}

export interface UnionDefinition<T extends MemberSchemaType>
  extends Definition {
  readonly items: T
}

export class UnionSchema<T extends MemberSchemaType> extends Schema<
  UnionMap<TypeMapOf<T>>,
  UnionDefinition<T>
> {
  public static readonly kind: string = 'union'

  /**
   * Create new signature for {@link UnionSchema}
   *
   * @returns A new signature instance
   */
  public static signature(items: MemberSchemaType): Signature {
    return Signature.create('Union', ...items.map((item) => item.signature))
  }

  /**
   * Create new instance of {@link UnionSchema}
   *
   * @param items Member schema
   * @returns A new instance of {@link UnionSchema}
   */
  public static create<T extends MemberSchemaType>(
    ...items: T
  ): UnionSchema<T> {
    return new UnionSchema({ signature: UnionSchema.signature(items), items })
  }

  /**
   * Check if given schema is instance of {@link UnionSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link UnionSchema}, false otherwise
   */
  public static override is(
    schema: Schema
  ): schema is UnionSchema<MemberSchemaType> {
    return schema.kind === UnionSchema.kind
  }

  public override readonly kind: string = UnionSchema.kind

  public get items(): T {
    return this.get('items')
  }

  public override is(value: unknown): value is UnionMap<TypeMapOf<T>> {
    return this.items.reduce(
      (result, schema) => result || schema.is(value),
      false
    )
  }

  public override validate(value: UnionMap<TypeMapOf<T>>): Violation[] {
    return super
      .validate(value)
      .concat(
        this.items
          .filter((item) => item.is(value))
          .flatMap((item) => item.validate(value))
      )
  }
}

/**
 * Create new instance of {@link UnionSchema}
 *
 * @param items Member schema
 * @returns A new instance of {@link UnionSchema}
 */
export function union<T extends MemberSchemaType>(...items: T): UnionSchema<T> {
  return UnionSchema.create(...items)
}

export class UndefinedSchema extends Schema<undefined> {
  public static readonly kind: string = 'undefined'

  private static readonly instance: UndefinedSchema = new UndefinedSchema({
    signature: UndefinedSchema.signature(),
  })

  /**
   * Create new signature for {@link UndefinedSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Undefined')
  }

  /**
   * Create new instance of {@link UndefinedSchema}
   *
   * @returns A new instance of {@link UndefinedSchema}
   */
  public static create(): UndefinedSchema {
    return UndefinedSchema.instance
  }

  /**
   * Check if given schema is instance of {@link UndefinedSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link UndefinedSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is UndefinedSchema {
    return schema.kind === UndefinedSchema.kind
  }

  public override readonly kind: string = UndefinedSchema.kind

  public override is(value: unknown): value is undefined {
    return value === undefined
  }
}

/**
 * Create new instance of {@link UndefinedSchema}
 *
 * @returns A new instance of {@link UndefinedSchema}
 */
export function _undefined(): UndefinedSchema {
  return UndefinedSchema.create()
}

export class UnknownSchema extends Schema<unknown> {
  public static readonly kind: string = 'unknown'

  private static readonly instance: UnknownSchema = new UnknownSchema({
    signature: UnknownSchema.signature(),
  })

  /**
   * Create new signature for {@link UnknownSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Unknown')
  }

  /**
   * Create new instance of {@link UnknownSchema}
   *
   * @returns A new instance of {@link UnknownSchema}
   */
  public static create(): UnknownSchema {
    return UnknownSchema.instance
  }

  /**
   * Check if given schema is instance of {@link UnknownSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link UnknownSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is UnknownSchema {
    return schema.kind === UnknownSchema.kind
  }

  public override readonly kind: string = UnknownSchema.kind

  public override is(_value: unknown): _value is unknown {
    return true
  }
}

/**
 * Create new instance of {@link UnknownSchema}
 *
 * @returns A new instance of {@link UnknownSchema}
 */
export function unknown(): UnknownSchema {
  return UnknownSchema.create()
}
