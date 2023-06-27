import { Definition } from '../Definition'
import { ObjectSchemaType } from './ObjectSchemaType'

export interface ObjectDefinition<T extends ObjectSchemaType>
  extends Definition {
  readonly properties: T
}
