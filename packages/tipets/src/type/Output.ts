import { outputSymbol } from '../symbol/outputSymbol'

/** Interface used to statically represent output type */
export interface Output<T = unknown> {
  readonly [outputSymbol]: T
}
