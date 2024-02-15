export const typeSymbol = Symbol.for('type')

/** Interface used to statically represent type */
export interface Type<T = unknown> {
  /** This should be ignored. Implementation should ignore using `!` operator */
  readonly [typeSymbol]: T
}

/** Utility type to get represented type from {@link Type} interface */
export type TypeOf<T extends Type> = T[typeof typeSymbol]

/** Utility type to get represented type from map of {@link Type} interface */
export type TypeMapOf<T> = {
  [K in keyof T]: T[K] extends Type ? TypeOf<T[K]> : never
}

export type Infer<T extends Type> = TypeOf<T>
