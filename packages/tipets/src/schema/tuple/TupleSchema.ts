import { TypeMapOf } from '../../TypeMapOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'
import { TupleDefinition } from './TupleDefinition'
import { TupleSchemaType } from './TupleSchemaType'

export class TupleSchema<T extends TupleSchemaType> extends Schema<
  TypeMapOf<T>,
  TupleDefinition<T>
> {
  public override readonly [kindSymbol]: string = 'tuple'

  public get items(): T {
    return this.get('items')
  }

  public override is(value: unknown): value is TypeMapOf<T> {
    return (
      Array.isArray(value) &&
      this.items.length === value.length &&
      this.items.reduce(
        (result, schema, index) => (result ? schema.is(value[index]) : false),
        true
      )
    )
  }

  public override validate(value: TypeMapOf<T>): Violation[] {
    return super.validate(value).concat(
      this.items.flatMap((item, index) =>
        item.validate(value[index]).map((error) => ({
          ...error,
          path: [index, ...(error.path ?? [])],
        }))
      )
    )
  }
}
