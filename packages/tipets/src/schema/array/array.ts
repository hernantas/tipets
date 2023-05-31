import { Schema } from '../Schema'
import { ArraySchema } from './ArraySchema'

export function array<S extends Schema>(type: S): ArraySchema<S> {
  return new ArraySchema({ type })
}
