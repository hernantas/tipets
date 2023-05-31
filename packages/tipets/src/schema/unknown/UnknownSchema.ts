import { Schema } from '../Schema'

export class UnknownSchema extends Schema<unknown> {
  public override is(_value: unknown): _value is unknown {
    return true
  }
}
