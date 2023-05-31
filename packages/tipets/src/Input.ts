import { inputSymbol } from './inputSymbol'

/** Interface used to statically represent input type */
export interface Input<T = unknown> {
  /** This should be ignored. Implementation should ignore using `!` operator */
  readonly [inputSymbol]: T
}
