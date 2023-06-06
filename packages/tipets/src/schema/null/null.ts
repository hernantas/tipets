import { NullSchema } from './NullSchema'
import { nullSignature } from './nullSignature'

const instance = new NullSchema({ signature: nullSignature() })
export function _null(): NullSchema {
  return instance
}
