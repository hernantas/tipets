import { Schema } from './Schema'

export class UndefinedSchema extends Schema<undefined> {
  public override is(value: unknown): value is undefined {
    return value === undefined
  }
}
