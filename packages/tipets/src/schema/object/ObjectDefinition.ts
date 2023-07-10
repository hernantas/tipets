import { Definition } from '../Definition'
import { TypeMapOf } from '../TypeMapOf'
import { ObjectSchemaType } from './ObjectSchemaType'

export interface ObjectDefinition<T extends ObjectSchemaType>
  extends Definition<TypeMapOf<T>> {
  readonly properties: T
}
