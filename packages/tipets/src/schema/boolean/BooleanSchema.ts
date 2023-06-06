import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class BooleanSchema extends Schema<boolean> {
  public override readonly [kindSymbol]: string = 'boolean'

  public override is(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }
}
