import { MemberType } from '../../alias/MemberType'
import { UnionMap } from '../../schema/union/UnionMap'
import { Codec } from '../Codec'
import { UnsupportedTypeError } from '../UnsupportedTypeError'
import { UnionCodecInfoMap } from './UnionCodecInfoMap'

export class UnionCodec<T extends MemberType> implements Codec<UnionMap<T>> {
  private readonly infos: UnionCodecInfoMap<T>

  public constructor(...infos: UnionCodecInfoMap<T>) {
    this.infos = infos
  }

  public decode(value: unknown): UnionMap<T> {
    // try to check if type match with the codec
    for (const info of this.infos) {
      if (info.is(value)) {
        return info.codec.decode(value)
      }
    }

    // brute force, try to decode using all available codec
    for (const info of this.infos) {
      try {
        return info.codec.decode(value)
      } catch (e) {
        // do nothing
      }
    }

    throw new UnsupportedTypeError(value)
  }

  public encode(value: UnionMap<T>): unknown {
    for (const info of this.infos) {
      if (info.is(value)) {
        return info.codec.encode(value)
      }
    }

    throw new UnsupportedTypeError(value)
  }
}
