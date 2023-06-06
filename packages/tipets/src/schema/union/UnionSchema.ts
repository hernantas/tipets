import { TypeMapOf } from '../../TypeMapOf'
import { Violation } from '../../Violation'
import { MemberSchemaType } from '../MemberSchemaType'
import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'
import { UnionDefinition } from './UnionDefinition'
import { UnionMap } from './UnionMap'

export class UnionSchema<T extends MemberSchemaType> extends Schema<
  UnionMap<TypeMapOf<T>>,
  UnionDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'union'

  public override readonly [kindSymbol]: string = UnionSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link UnionSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link UnionSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is UnionSchema<any> {
    return schema[kindSymbol] === UnionSchema[kindSymbol]
  }

  public get items(): T {
    return this.get('items')
  }

  public override is(value: unknown): value is UnionMap<TypeMapOf<T>> {
    return this.items.reduce(
      (result, schema) => result || schema.is(value),
      false
    )
  }

  public override validate(value: UnionMap<TypeMapOf<T>>): Violation[] {
    return super
      .validate(value)
      .concat(
        this.items
          .filter((item) => item.is(value))
          .flatMap((item) => item.validate(value))
      )
  }
}
