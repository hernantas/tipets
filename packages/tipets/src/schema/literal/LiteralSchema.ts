import { LiteralType } from '../../alias/LiteralType'
import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'
import { LiteralDefinition } from './LiteralDefinition'

export class LiteralSchema<T extends LiteralType> extends Schema<
  T,
  LiteralDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'literal'

  public override readonly [kindSymbol]: string = LiteralSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link LiteralSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link LiteralSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is LiteralSchema<any> {
    return schema[kindSymbol] === LiteralSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link LiteralSchema}
   *
   * @returns A new signature instance
   */
  public static signature(value: LiteralType): Signature {
    return Signature.create(`'${value.toString()}'`)
  }

  /**
   * Create new instance of {@link LiteralSchema}
   *
   * @param value Literal value of schema
   * @returns A new instance of {@link LiteralSchema}
   */
  public static create<T extends LiteralType>(value: T): LiteralSchema<T> {
    return new LiteralSchema({
      signature: LiteralSchema.signature(value),
      value,
    })
  }

  public get value(): T {
    return this.get('value')
  }

  public override is(value: unknown): value is T {
    return this.value === value
  }
}
