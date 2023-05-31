import { Input } from './Input'
import { inputSymbol } from './inputSymbol'

/** Utility type to get represented type from {@link Input} interface */
export type InputOf<T extends Input> = T[typeof inputSymbol]
