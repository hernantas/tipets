import { Schema } from '../Schema'

export class BooleanSchema extends Schema<boolean> {
  public override is(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }
}
