import { TypeOf } from '../../TypeOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'
import { ArrayDefinition } from './ArrayDefinition'

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
      value.reduce(
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
