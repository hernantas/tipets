import { ObjectType, ConstructorType } from './type-alias'

/** @internal */
export const definitionSymbol = Symbol.for('definition')

/**
 * Utility class that can build or modify definition object `<T>` in immutable
 * way.
 */
export class ImmutableBuilder<T extends ObjectType> {
  /** Definition object */
  private readonly [definitionSymbol]: T

  /**
   * MUST NOT OVERRIDE.
   *
   * Used as initialized value for definition
   *
   * @param definition New definition object
   */
  public constructor(definition: T) {
    this[definitionSymbol] = definition
  }

  /**
   * Create new instance of current object with given property of definition set
   * with new given value
   *
   * @param key Key property of definition
   * @param value New value
   * @returns New instance of current object
   */
  public set<K extends keyof T>(key: K, value: T[K]): this {
    const Constructor = this.constructor as ConstructorType<this, [T]>
    return new Constructor({
      ...this[definitionSymbol],
      [key]: value,
    })
  }

  /**
   * Get definition value from given key property
   *
   * @param key Key property of definition
   * @returns Value property of definition with the given key
   */
  public get<K extends keyof T>(key: K): T[K] {
    return this[definitionSymbol][key]
  }
}
