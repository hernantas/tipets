import { TypeOf } from '../../TypeOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'
import { OptionalDefinition } from './OptionalDefinition'

export class OptionalSchema<T extends Schema> extends Schema<
  TypeOf<T> | undefined,
  OptionalDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'optional'

  public override readonly [kindSymbol]: string = OptionalSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link OptionalSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link OptionalSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is OptionalSchema<Schema> {
    return schema[kindSymbol] === OptionalSchema[kindSymbol]
  }

  public get type(): T {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<T> | undefined {
    return value === undefined || this.type.is(value)
  }

  public override validate(value: TypeOf<T> | undefined): Violation[] {
    return super
      .validate(value)
      .concat(...(this.type.is(value) ? this.type.validate(value) : []))
  }
}
