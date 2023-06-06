import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'

export class BooleanSchema extends Schema<boolean> {
  public static readonly [kindSymbol]: string = 'boolean'

  private static readonly instance: BooleanSchema = new BooleanSchema({
    signature: BooleanSchema.signature(),
  })

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

  /**
   * Create new signature for {@link BooleanSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('Boolean')
  }

  /**
   * Create new instance of {@link BooleanSchema}
   *
   * @returns A new instance of {@link BooleanSchema}
   */
  public static create(): BooleanSchema {
    return BooleanSchema.instance
  }

  public override is(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }
}
