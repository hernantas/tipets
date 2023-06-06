import { TypeOf } from '../../TypeOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'
import { NullableDefinition } from './NullableDefinition'

export class NullableSchema<T extends Schema> extends Schema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  public override readonly [kindSymbol]: string = 'nullable'

  public get type(): T {
    return this.get('type')
  }

  public override is(value: unknown): value is TypeOf<T> | null {
    return value === null || this.type.is(value)
  }

  public override validate(value: TypeOf<T> | null): Violation[] {
    return super
      .validate(value)
      .concat(...(this.type.is(value) ? this.type.validate(value) : []))
  }
}
