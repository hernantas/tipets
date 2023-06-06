import { LiteralType } from '../../alias/LiteralType'
import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'
import { LiteralDefinition } from './LiteralDefinition'

export class LiteralSchema<T extends LiteralType> extends Schema<
  T,
  LiteralDefinition<T>
> {
  public override readonly [kindSymbol]: string = 'literal'

  public get value(): T {
    return this.get('value')
  }

  public override is(value: unknown): value is T {
    return this.value === value
  }
}
