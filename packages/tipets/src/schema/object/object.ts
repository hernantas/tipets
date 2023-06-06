import { ObjectSchema } from './ObjectSchema'
import { ObjectSchemaType } from './ObjectSchemaType'

/**
 * Create new instance of {@link ObjectSchema}
 *
 * @param properties Properties of object schema
 * @returns A new instance of {@link ObjectSchema}
 */
export function object<T extends ObjectSchemaType>(
  properties: T
): ObjectSchema<T> {
  return ObjectSchema.create(properties)
}
