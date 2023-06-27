import { Key } from './Key'

/**
 * Extract type from field of `<T>` with `<K>` key, or `<R>` type if key doesn't
 * exists
 */
export type At<T, K extends Key, R = never> = K extends keyof T ? T[K] : R
