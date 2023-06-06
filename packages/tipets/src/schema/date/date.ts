import { DateSchema } from './DateSchema'
import { dateSignature } from './dateSignature'

const instance = new DateSchema({ signature: dateSignature() })
export function date(): DateSchema {
  return instance
}
