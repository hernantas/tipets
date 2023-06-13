import { typeSymbol } from './typeSymbol'

/** Interface used to statically represent type */
export interface Type<T = unknown> {
  /** This should be ignored. Implementation should ignore using `!` operator */
  readonly [typeSymbol]: T
}
