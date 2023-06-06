import { UndefinedSchema } from './UndefinedSchema'
import { undefinedSignature } from './undefinedSignature'

const instance = new UndefinedSchema({ signature: undefinedSignature() })
export function _undefined(): UndefinedSchema {
  return instance
}
