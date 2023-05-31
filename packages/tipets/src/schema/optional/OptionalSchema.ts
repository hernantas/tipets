import { TypeOf } from '../../TypeOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { OptionalDefinition } from './OptionalDefinition'

export class OptionalSchema<T extends Schema> extends Schema<
  TypeOf<T>,
  OptionalDefinition<T>
> {
  public get type(): T {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<T> {
    return value === undefined || this.type.is(value)
  }

  public override validate(value: TypeOf<T>): Violation[] {
    return super
      .validate(value)
      .concat(...(this.type.is(value) ? this.type.validate(value) : []))
  }
}
