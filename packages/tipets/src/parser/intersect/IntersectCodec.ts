import { MemberType } from '../../type-alias'
import { IntersectMap } from '../../schema/intersect/IntersectMap'
import { Codec } from '../Codec'
import { CodecMap } from '../CodecMap'

export class IntersectCodec<T extends MemberType>
  implements Codec<IntersectMap<T>>
{
  private readonly codecs: CodecMap<T>
  public constructor(...codecs: CodecMap<T>) {
    this.codecs = codecs
  }

  public decode(value: unknown): IntersectMap<T> {
    return this.codecs
      .map((codec) => codec.decode(value))
      .filter((v) => typeof v === 'object')
      .reduce((result, v) => merge(result, v), {}) as IntersectMap<T>
  }

  public encode(value: IntersectMap<T>): unknown {
    return this.codecs
      .map((codec) => codec.encode(value))
      .filter((v) => typeof v === 'object')
      .reduce((result, v) => merge(result, v), {}) as IntersectMap<T>
  }
}

/**
 * Merge 2 given object
 *
 * @param base Base to be merged
 * @param target Target to be merged
 * @returns A new object from the merger
 */
function merge<T, U>(base: T, target: U): T & U {
  return {
    ...target,
    ...base,
  }
}
