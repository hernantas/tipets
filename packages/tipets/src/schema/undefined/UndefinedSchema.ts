import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'

export class UndefinedSchema extends Schema<undefined> {
  public static readonly [kindSymbol]: string = 'undefined'

  public override readonly [kindSymbol]: string = UndefinedSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link UndefinedSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link UndefinedSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is UndefinedSchema {
    return schema[kindSymbol] === UndefinedSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link UndefinedSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Undefined')
  }

  public override is(value: unknown): value is undefined {
    return value === undefined
  }
}
