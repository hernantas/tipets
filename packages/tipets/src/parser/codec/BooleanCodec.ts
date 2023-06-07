import { BooleanSchema } from '../../schema/boolean/BooleanSchema'
import { Codec } from '../Codec'

export class BooleanCodec implements Codec<BooleanSchema> {
  public decode(value: unknown): boolean {
    return !!value
  }

  public encode(value: boolean): unknown {
    return value
  }
}
