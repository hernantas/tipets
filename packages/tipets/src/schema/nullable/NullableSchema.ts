import { TypeOf } from '../../TypeOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'
import { NullableDefinition } from './NullableDefinition'

export class NullableSchema<T extends Schema> extends Schema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'nullable'

  public override readonly [kindSymbol]: string = NullableSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link NullableSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link NullableSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is NullableSchema<Schema> {
    return schema[kindSymbol] === NullableSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link NullableSchema}
   *
   * @returns A new signature instance
   */
  public static signature(schema: Schema): Signature {
    return Signature.create('Nullable', schema.signature)
  }

  /**
   * Create new instance of {@link NullableSchema}
   *
   * @param type Inner schema type
   * @returns A new instance of {@link NullableSchema}
   */
  public static create<T extends Schema>(type: T): NullableSchema<T> {
    return new NullableSchema({
      signature: NullableSchema.signature(type),
      type,
    })
  }

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
