import { inputSymbol } from '../symbol/inputSymbol'
import { Input } from './Input'

/** Utility type to get represented type from {@link Input} interface */
export type InputOf<T extends Input> = T[typeof inputSymbol]
