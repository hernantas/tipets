import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { TypeOf } from '../../type'
import { Violation } from '../Violation'
import { kindSymbol } from '../kindSymbol'
import { OptionalDefinition } from './OptionalDefinition'

export class OptionalSchema<T extends Schema> extends Schema<
  TypeOf<T> | undefined,
  OptionalDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'optional'

  public override readonly [kindSymbol]: string = OptionalSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link OptionalSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link OptionalSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is OptionalSchema<Schema> {
    return schema[kindSymbol] === OptionalSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link OptionalSchema}
   *
   * @returns A new signature instance
   */
  public static signature(type: Schema): Signature {
    return Signature.create('Optional', type.signature)
  }

  /**
   * Create new instance of {@link OptionalSchema}
   *
   * @param type Inner schema type
   * @returns A new instance of {@link OptionalSchema}
   */
  public static create<T extends Schema>(type: T): OptionalSchema<T> {
    return new OptionalSchema({
      signature: OptionalSchema.signature(type),
      type,
    })
  }

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
