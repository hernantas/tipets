import { TypeMapOf } from '../TypeMapOf'
import { Violation } from '../Violation'
import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'
import { ObjectDefinition } from './ObjectDefinition'
import { ObjectSchemaType } from './ObjectSchemaType'

export class ObjectSchema<T extends ObjectSchemaType> extends Schema<
  TypeMapOf<T>,
  ObjectDefinition<T>
> {
  public static readonly [kindSymbol]: string = 'object'

  public override readonly [kindSymbol]: string = ObjectSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link ObjectSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link ObjectSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is ObjectSchema<any> {
    return schema[kindSymbol] === ObjectSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link ObjectSchema}
   *
   * @returns A new signature instance
   */
  public static signature(properties: ObjectSchemaType): Signature {
    return Object.entries(properties).reduce(
      (result, [key, schema]) => result.property(key, schema.signature),
      Signature.create('Object')
    )
  }

  /**
   * Create new instance of {@link ObjectSchema}
   *
   * @param properties Properties of object schema
   * @returns A new instance of {@link ObjectSchema}
   */
  public static create<T extends ObjectSchemaType>(
    properties: T
  ): ObjectSchema<T> {
    return new ObjectSchema({
      signature: ObjectSchema.signature(properties),
      properties,
    })
  }

  /** Get list of keys of schema */
  public get keys(): string[] {
    return Object.keys(this.properties)
  }

  /** Get properties of schema */
  public get properties(): T {
    return this.get('properties')
  }

  /** Get properties of schema */
  public get props(): T {
    return this.get('properties')
  }

  public override is(value: unknown): value is TypeMapOf<T> {
    return (
      typeof value === 'object' &&
      value !== null &&
      Object.entries(this.properties).reduce(
        (result, [key, schema]) =>
          result && schema.is((value as TypeMapOf<T>)[key]),
        true
      )
    )
  }

  public override validate(value: TypeMapOf<T>): Violation[] {
    return super
      .validate(value)
      .concat(
        Object.entries(this.properties).flatMap(([key, schema]) =>
          schema
            .validate(value[key])
            .map((error) => ({ ...error, path: [key, ...(error.path ?? [])] }))
        )
      )
  }
}
