import { AnySchema } from './AnySchema'

const instance = new AnySchema({ signature: AnySchema.signature() })
export function any(): AnySchema {
  return instance
}
