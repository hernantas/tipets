import { BooleanSchema } from './BooleanSchema'
import { booleanSignature } from './booleanSignature'

const instance = new BooleanSchema({ signature: booleanSignature() })
export function boolean(): BooleanSchema {
  return instance
}
