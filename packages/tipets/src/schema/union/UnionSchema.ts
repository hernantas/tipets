import { Schema, kindSymbol } from '../../schema'
import { TypeMapOf } from '../../type'
import { UnionMap } from '../../type-helper'
import { MemberSchemaType } from '../MemberSchemaType'
import { Signature } from '../Signature'
import { Violation } from '../Violation'
import { UnionDefinition } from './UnionDefinition'

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
  public static override is(
    schema: Schema
  ): schema is UnionSchema<MemberSchemaType> {
    return schema[kindSymbol] === UnionSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link UnionSchema}
   *
   * @returns A new signature instance
   */
  public static signature(items: MemberSchemaType): Signature {
    return Signature.create('Union', ...items.map((item) => item.signature))
  }

  /**
   * Create new instance of {@link UnionSchema}
   *
   * @param items Member schema
   * @returns A new instance of {@link UnionSchema}
   */
  public static create<T extends MemberSchemaType>(
    ...items: T
  ): UnionSchema<T> {
    return new UnionSchema({ signature: UnionSchema.signature(items), items })
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
