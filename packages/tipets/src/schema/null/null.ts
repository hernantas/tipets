import { NullSchema } from './NullSchema'

const instance = new NullSchema({ signature: NullSchema.signature() })
export function _null(): NullSchema {
  return instance
}
