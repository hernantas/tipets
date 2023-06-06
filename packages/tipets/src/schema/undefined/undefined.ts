import { UndefinedSchema } from './UndefinedSchema'

const instance = new UndefinedSchema({ signature: UndefinedSchema.signature() })
export function _undefined(): UndefinedSchema {
  return instance
}
