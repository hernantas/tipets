import { UnknownSchema } from './UnknownSchema'

const instance = new UnknownSchema({})
export function unknown(): UnknownSchema {
  return instance
}
