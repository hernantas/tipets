import { Codec } from '../Codec'

export class StringCodec implements Codec<string> {
  public decode(value: unknown): string {
    if (typeof value === 'string') {
      return value
    }
    if (value === null || value === undefined) {
      return ''
    }
    return String(value)
  }

  public encode(value: string): unknown {
    return value
  }
}
