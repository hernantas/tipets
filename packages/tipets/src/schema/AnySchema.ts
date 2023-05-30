import { Schema } from './Schema'

export class AnySchema extends Schema<any> {
  public override is(_value: unknown): _value is any {
    return true
  }
}
