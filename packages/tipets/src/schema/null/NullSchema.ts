import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class NullSchema extends Schema<undefined> {
  public override readonly [kindSymbol]: string = 'null'

  public override is(value: unknown): value is undefined {
    return value === null
  }
}
