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
  public static readonly [kindSymbol]: string = 'intersect'

  public override readonly [kindSymbol]: string = IntersectSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link IntersectSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link IntersectSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is IntersectSchema<any> {
    return schema[kindSymbol] === IntersectSchema[kindSymbol]
  }

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
