import { LiteralType } from '../alias/LiteralType'
import { Schema } from './Schema'
import { LiteralDefinition } from './definition/LiteralDefinition'

export class LiteralSchema<T extends LiteralType> extends Schema<
  T,
  LiteralDefinition<T>
> {
  public get value(): T {
    return this.get('value')
  }

  public override is(value: unknown): value is T {
    return this.value === value
  }
}
