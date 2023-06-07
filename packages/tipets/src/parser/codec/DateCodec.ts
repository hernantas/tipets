import { DateSchema } from '../../schema/date/DateSchema'
import { Codec } from '../Codec'
import { UnsupportedTypeError } from '../error/UnsupportedTypeError'
import { UnsupportedValueError } from '../error/UnsupportedValueError'

export class DateCodec implements Codec<DateSchema> {
  public decode(value: unknown): Date {
    if (typeof value === 'string') {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new UnsupportedValueError(value)
      }
      return date
    }

    if (value instanceof Date) {
      return value
    }

    throw new UnsupportedTypeError(value)
  }

  public encode(value: Date): unknown {
    return value.toUTCString()
  }
}
