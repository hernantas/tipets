import { LiteralType } from '../../alias/LiteralType'
import { Schema } from '../Schema'
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

  public get value(): T {
    return this.get('value')
  }

  public override is(value: unknown): value is T {
    return this.value === value
  }
}
