import { StringSchema } from '../../schema/string/StringSchema'
import { Codec } from '../Codec'

export class StringCodec implements Codec<StringSchema> {
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
