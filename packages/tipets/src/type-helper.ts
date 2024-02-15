import { Key, MemberType, ObjectType } from './type-alias'

/**
 * Extract type from field of `<T>` with `<K>` key, or `<R>` type if key doesn't
 * exists
 */
export type At<T, K extends Key, R = never> = K extends keyof T ? T[K] : R

/** Merge both object into simple object */
export type Merge<T1 extends ObjectType, T2 extends ObjectType> = {
  [K in keyof (T1 & T2)]: At<T1, K> | At<T2, K>
}

/** Utility type to convert {@link MemberType} into union */
export type UnionMap<T extends MemberType> = T[number]

export type IntersectOf<T> = (
  T extends unknown ? (key: T) => void : never
) extends (key: infer I) => void
  ? I
  : never

/** Utility type to convert {@link MemberType} to intersect */
export type IntersectMap<T extends MemberType> = IntersectOf<UnionMap<T>>

/** Get key from `T` that have undefined type */
export type OptionalKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never
}[keyof T]

/** Get key from `T` that do not have undefined type */
export type RequiredKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? never : K
}[keyof T]

type PickAndChooseOptional<T> = {
  [K in RequiredKeys<T>]: T[K]
} & {
  [K in OptionalKeys<T>]?: T[K]
}

/** Utility type to convert property that have `undefined` to optional */
export type ShapeType<T extends ObjectType> = {
  [K in keyof PickAndChooseOptional<T>]: PickAndChooseOptional<T>[K]
}
