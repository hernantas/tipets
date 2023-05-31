import { Output } from './Output'
import { outputSymbol } from './outputSymbol'

/** Utility type to get represented type from {@link Output} interface */
export type OutputOf<T extends Output> = T[typeof outputSymbol]
