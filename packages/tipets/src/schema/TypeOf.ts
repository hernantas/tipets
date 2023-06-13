import { Type } from './Type'
import { typeSymbol } from './typeSymbol'

/** Utility type to get represented type from {@link Type} interface */
export type TypeOf<T extends Type> = T[typeof typeSymbol]
