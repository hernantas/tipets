import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class AnySchema extends Schema<any> {
  public override readonly [kindSymbol]: string = 'any'

  public override is(_value: unknown): _value is any {
    return true
  }
}
