import { UndefinedSchema } from '../UndefinedSchema'

const instance = new UndefinedSchema({})
export function _undefined(): UndefinedSchema {
  return instance
}
