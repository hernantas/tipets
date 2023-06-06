import { NumberSchema } from './NumberSchema'
import { numberSignature } from './numberSignature'

const instance = new NumberSchema({ signature: numberSignature() })
export function number(): NumberSchema {
  return instance
}
