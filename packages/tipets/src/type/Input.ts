import { inputSymbol } from '../symbol/inputSymbol'

/** Interface used to statically represent input type */
export interface Input<T = unknown> {
  readonly [inputSymbol]: T
}
