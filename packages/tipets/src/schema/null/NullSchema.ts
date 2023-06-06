import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'

export class NullSchema extends Schema<undefined> {
  public static readonly [kindSymbol]: string = 'null'

  private static readonly instance = new NullSchema({
    signature: NullSchema.signature(),
  })

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

  /**
   * Create new signature for {@link NullSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Null')
  }

  /**
   * Create new instance of {@link NullSchema}
   *
   * @returns A new instance of {@link NullSchema}
   */
  public static create(): NullSchema {
    return NullSchema.instance
  }

  public override is(value: unknown): value is undefined {
    return value === null
  }
}
