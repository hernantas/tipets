import { TypeMapOf } from '../../TypeMapOf'
import { Violation } from '../../Violation'
import { UnionMap } from './UnionMap'
import { MemberSchemaType } from '../MemberSchemaType'
import { Schema } from '../Schema'
import { UnionDefinition } from './UnionDefinition'

export class UnionSchema<T extends MemberSchemaType> extends Schema<
  UnionMap<TypeMapOf<T>>,
  UnionDefinition<T>
> {
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
