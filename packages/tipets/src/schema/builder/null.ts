import { NullSchema } from '../NullSchema'

const instance = new NullSchema({})
export function _null(): NullSchema {
  return instance
}
