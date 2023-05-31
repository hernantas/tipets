import { ArraySchema } from '../ArraySchema'
import { Schema } from '../Schema'

export function array<S extends Schema>(type: S): ArraySchema<S> {
  return new ArraySchema({ type })
}
