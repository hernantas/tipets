import { Schema } from '../Schema'
import { ArraySchema } from './ArraySchema'
import { arraySignature } from './arraySignature'

export function array<S extends Schema>(type: S): ArraySchema<S> {
  return new ArraySchema({ signature: arraySignature(type), type })
}
