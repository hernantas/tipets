/** Alias for object key type */
export type Key = string | number | symbol

/** Alias for constructor type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorType<T = unknown, Args extends unknown[] = any[]> = {
  new (...args: Args): T
}

export type LiteralType = string | number | boolean

/** Represent type that have members */
export type MemberType<T = unknown> = [T, T, ...T[]]

/** Alias for object type */
export type ObjectType<T = unknown> = Record<Key, T>

/** Alias for Tuple Type */
export type TupleType<T = unknown> = [T, ...T[]]
