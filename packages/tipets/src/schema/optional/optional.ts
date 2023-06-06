import { Schema } from '../Schema'
import { OptionalSchema } from './OptionalSchema'

export function optional<T extends Schema>(type: T): OptionalSchema<T> {
  return new OptionalSchema({ signature: OptionalSchema.signature(type), type })
}
