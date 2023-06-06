import { ObjectSchema } from './ObjectSchema'
import { ObjectSchemaType } from './ObjectSchemaType'
import { objectSignature } from './objectSignature'

export function object<T extends ObjectSchemaType>(
  properties: T
): ObjectSchema<T> {
  return new ObjectSchema({
    signature: objectSignature(properties),
    properties,
  })
}
