import { Key } from './alias/Key'
import { ImmutableBuilder } from './builder'
import { Signature } from './schema/Signature'
import { ValidationRule } from './schema/ValidationRule'
import { Violation } from './schema/Violation'
import { Type, typeSymbol } from './type'

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
