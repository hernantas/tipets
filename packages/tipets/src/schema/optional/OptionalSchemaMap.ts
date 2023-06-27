import { OptionalSchema } from './OptionalSchema'
import { ObjectSchemaType } from '../object/ObjectSchemaType'

export type OptionalSchemaMap<T extends ObjectSchemaType> = {
  [K in keyof T]: OptionalSchema<T[K]>
}
