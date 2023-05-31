import { TypeOf } from '../../TypeOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { OptionalDefinition } from './OptionalDefinition'

export class OptionalSchema<T extends Schema> extends Schema<
  TypeOf<T> | undefined,
  OptionalDefinition<T>
> {
  public get type(): T {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<T> | undefined {
    return value === undefined || this.type.is(value)
  }

  public override validate(value: TypeOf<T> | undefined): Violation[] {
    return super
      .validate(value)
      .concat(...(this.type.is(value) ? this.type.validate(value) : []))
  }
}
