import { AnySchema } from './AnySchema'
import { anySignature } from './anySignature'

const instance = new AnySchema({ signature: anySignature() })
export function any(): AnySchema {
  return instance
}
