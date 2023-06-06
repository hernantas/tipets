import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'

export class AnySchema extends Schema<any> {
  public static readonly [kindSymbol]: string = 'any'

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

  public override is(_value: unknown): _value is any {
    return true
  }
}
