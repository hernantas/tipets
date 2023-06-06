import { UnknownSchema } from './UnknownSchema'
import { unknownSignature } from './unknownSignature'

const instance = new UnknownSchema({ signature: unknownSignature() })
export function unknown(): UnknownSchema {
  return instance
}
