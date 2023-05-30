import { NumberSchema } from '../NumberSchema'

const instance = new NumberSchema({})
export function number(): NumberSchema {
  return instance
}
