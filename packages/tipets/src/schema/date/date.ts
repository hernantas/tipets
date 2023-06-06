import { DateSchema } from './DateSchema'

const instance = new DateSchema({ signature: DateSchema.signature() })
export function date(): DateSchema {
  return instance
}
