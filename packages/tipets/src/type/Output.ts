import { outputSymbol } from '../symbol/outputSymbol'

/** Interface used to statically represent output type */
export interface Output<T = unknown> {
  /** This should be ignored. Implementation should ignore using `!` operator */
  readonly [outputSymbol]: T
}
