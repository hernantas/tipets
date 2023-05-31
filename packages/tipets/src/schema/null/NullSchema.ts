import { Schema } from '../Schema'

export class NullSchema extends Schema<undefined> {
  public override is(value: unknown): value is undefined {
    return value === null
  }
}
