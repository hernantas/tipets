import { ImmutableBuilder } from '../ImmutableBuilder'
import { Type } from '../Type'
import { Violation } from '../Violation'
import { typeSymbol } from '../typeSymbol'
import { Definition } from './Definition'
import { Signature } from './Signature'
import { ValidationRule } from './ValidationRule'
import { kindSymbol } from './kindSymbol'

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
