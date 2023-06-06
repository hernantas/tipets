import { NumberSchema } from './NumberSchema'

const instance = new NumberSchema({ signature: NumberSchema.signature() })
export function number(): NumberSchema {
  return instance
}
