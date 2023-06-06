import { TypeMapOf } from '../../TypeMapOf'
import { Violation } from '../../Violation'
import { MemberSchemaType } from '../MemberSchemaType'
import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'
import { IntersectDefinition } from './IntersectDefinition'
import { IntersectMap } from './IntersectMap'

export class IntersectSchema<T extends MemberSchemaType> extends Schema<
  IntersectMap<TypeMapOf<T>>,
  IntersectDefinition<T>
> {
  public override readonly [kindSymbol]: string = 'intersect'

  public get items(): T {
    return this.get('items')
  }

  public override is(value: unknown): value is IntersectMap<TypeMapOf<T>> {
    return this.items.reduce(
      (result, schema) => result && schema.is(value),
      true
    )
  }

  public override validate(value: IntersectMap<TypeMapOf<T>>): Violation[] {
    return super
      .validate(value)
      .concat(this.items.flatMap((item) => item.validate(value)))
  }
}
