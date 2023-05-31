import { MemberType } from '../../alias/MemberType'

/** Utility type to convert {@link MemberType} into union */
export type UnionMap<T extends MemberType> = T[number]
