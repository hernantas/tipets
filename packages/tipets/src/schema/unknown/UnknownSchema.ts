import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class UnknownSchema extends Schema<unknown> {
  public override readonly [kindSymbol]: string = 'unknown'

  public override is(_value: unknown): _value is unknown {
    return true
  }
}
