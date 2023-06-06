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
  public static readonly [kindSymbol]: string = 'tuple'

  public override readonly [kindSymbol]: string = TupleSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link TupleSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link TupleSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is TupleSchema<any> {
    return schema[kindSymbol] === TupleSchema[kindSymbol]
  }

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
