import { MemberType } from '../../type-alias'
import { UnionMap } from '../union/UnionMap'
import { IntersectOf } from './IntersectOf'

/** Utility type to convert {@link MemberType} to intersect */
export type IntersectMap<T extends MemberType> = IntersectOf<UnionMap<T>>
