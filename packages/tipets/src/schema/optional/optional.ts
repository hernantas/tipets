import { Schema } from '../Schema'
import { OptionalSchema } from './OptionalSchema'
import { optionalSignature } from './optionalSignature'

export function optional<T extends Schema>(type: T): OptionalSchema<T> {
  return new OptionalSchema({ signature: optionalSignature(type), type })
}
