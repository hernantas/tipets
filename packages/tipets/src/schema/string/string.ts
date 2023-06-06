import { StringSchema } from './StringSchema'

const instance = new StringSchema({ signature: StringSchema.signature() })
export function string(): StringSchema {
  return instance
}
