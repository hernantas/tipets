import { BooleanSchema } from './BooleanSchema'

const instance = new BooleanSchema({ signature: BooleanSchema.signature() })
export function boolean(): BooleanSchema {
  return instance
}
