import { outputSymbol } from '../symbol/outputSymbol'
import { Output } from './Output'

/** Utility type to get represented type from {@link Output} interface */
export type OutputOf<T extends Output> = T[typeof outputSymbol]
