import { DateSchema } from './DateSchema'

const instance = new DateSchema({})
export function date(): DateSchema {
  return instance
}
