import { AnySchema } from '../AnySchema'

const instance = new AnySchema({})
export function any(): AnySchema {
  return instance
}
