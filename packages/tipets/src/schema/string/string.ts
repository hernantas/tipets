import { StringSchema } from './StringSchema'
import { stringSignature } from './stringSignature'

const instance = new StringSchema({ signature: stringSignature() })
export function string(): StringSchema {
  return instance
}
