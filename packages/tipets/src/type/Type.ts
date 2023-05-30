import { typeSymbol } from '../symbol/typeSymbol'

/** Interface used to statically represent type */
export interface Type<T = unknown> {
  readonly [typeSymbol]: T
}
