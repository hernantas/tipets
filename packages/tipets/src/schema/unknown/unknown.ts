import { UnknownSchema } from './UnknownSchema'

const instance = new UnknownSchema({ signature: UnknownSchema.signature() })
export function unknown(): UnknownSchema {
  return instance
}
