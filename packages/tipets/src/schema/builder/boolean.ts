import { BooleanSchema } from '../BooleanSchema'

const instance = new BooleanSchema({})
export function boolean(): BooleanSchema {
  return instance
}
