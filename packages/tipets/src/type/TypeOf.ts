import { typeSymbol } from '../symbol/typeSymbol'
import { Type } from './Type'

/** Utility type to get represented type from {@link Type} interface */
export type TypeOf<T extends Type> = T[typeof typeSymbol]
