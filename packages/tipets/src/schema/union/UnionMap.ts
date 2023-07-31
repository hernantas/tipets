import { MemberType } from '../../type-alias'

/** Utility type to convert {@link MemberType} into union */
export type UnionMap<T extends MemberType> = T[number]
