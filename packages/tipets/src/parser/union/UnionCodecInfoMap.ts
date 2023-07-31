import { MemberType } from '../../type-alias'
import { Codec } from '../Codec'

export type UnionCodecInfoMap<T extends MemberType> = {
  [K in keyof T]: {
    is: (value: unknown) => value is T[K]
    codec: Codec<T[K]>
  }
}
