import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class UndefinedSchema extends Schema<undefined> {
  public override readonly [kindSymbol]: string = 'undefined'

  public override is(value: unknown): value is undefined {
    return value === undefined
  }
}
