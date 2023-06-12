import { Codec } from '../Codec'

export class BooleanCodec implements Codec<boolean> {
  public decode(value: unknown): boolean {
    return !!value
  }

  public encode(value: boolean): unknown {
    return value
  }
}
