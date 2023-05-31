import { ObjectSchema } from './ObjectSchema'
import { ObjectSchemaType } from './ObjectSchemaType'

export function object<T extends ObjectSchemaType>(
  properties: T
): ObjectSchema<T> {
  return new ObjectSchema({ properties })
}
