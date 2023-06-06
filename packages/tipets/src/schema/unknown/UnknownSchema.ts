import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'

export class UnknownSchema extends Schema<unknown> {
  public static readonly [kindSymbol]: string = 'unknown'

  public override readonly [kindSymbol]: string = UnknownSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link UnknownSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link UnknownSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is UnknownSchema {
    return schema[kindSymbol] === UnknownSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link UnknownSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Unknown')
  }

  public override is(_value: unknown): _value is unknown {
    return true
  }
}
