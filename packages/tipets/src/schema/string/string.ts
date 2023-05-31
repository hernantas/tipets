import { StringSchema } from './StringSchema'

const instance = new StringSchema({})
export function string(): StringSchema {
  return instance
}
