import { ImmutableBuilder } from '../ImmutableBuilder'
import { Violation } from '../Violation'
import { typeSymbol } from '../symbol/typeSymbol'
import { Type } from '../type/Type'
import { Definition } from './definition/Definition'
import { ValidationRule } from './validation/ValidationRule'

export abstract class Schema<T, D extends Definition = Definition>
  extends ImmutableBuilder<D>
  implements Type<T>
{
  public readonly [typeSymbol]!: T

  /** Get current validation rules */
  public get rules(): ValidationRule<T>[] {
    return this.get('rules') ?? []
  }

  /**
   * Type guard for current type `T`
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
