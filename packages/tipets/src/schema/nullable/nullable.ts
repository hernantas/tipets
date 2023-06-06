import { Schema } from '../Schema'
import { NullableSchema } from './NullableSchema'
import { nullableSignature } from './nullableSignature'

export function nullable<T extends Schema>(type: T): NullableSchema<T> {
  return new NullableSchema({ signature: nullableSignature(type), type })
}
