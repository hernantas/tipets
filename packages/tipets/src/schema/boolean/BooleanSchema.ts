import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class BooleanSchema extends Schema<boolean> {
  public static readonly [kindSymbol]: string = 'boolean'

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

  public override is(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }
}
