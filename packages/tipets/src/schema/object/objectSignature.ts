import { Signature } from '../Signature'
import { ObjectSchemaType } from './ObjectSchemaType'

/**
 * Create new signature for {@link ObjectSchema}
 *
 * @returns A new signature instance
 */
export function objectSignature(properties: ObjectSchemaType): Signature {
  return Object.entries(properties).reduce(
    (result, [key, schema]) => result.property(key, schema.signature),
    Signature.create('Object')
  )
}
