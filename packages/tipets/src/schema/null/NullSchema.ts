import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class NullSchema extends Schema<undefined> {
  public static readonly [kindSymbol]: string = 'null'

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

  public override is(value: unknown): value is undefined {
    return value === null
  }
}
