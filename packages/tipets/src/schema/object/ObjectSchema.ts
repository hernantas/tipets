import { TypeMapOf } from '../../TypeMapOf'
import { Violation } from '../../Violation'
import { Schema } from '../Schema'
import { ObjectDefinition } from './ObjectDefinition'
import { ObjectSchemaType } from './ObjectSchemaType'

export class ObjectSchema<T extends ObjectSchemaType> extends Schema<
  TypeMapOf<T>,
  ObjectDefinition<T>
> {
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
