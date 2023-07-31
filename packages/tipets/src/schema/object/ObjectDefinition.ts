import { Definition } from '../../schema'
import { TypeMapOf } from '../../type'
import { ObjectSchemaType } from './ObjectSchemaType'

export interface ObjectDefinition<T extends ObjectSchemaType>
  extends Definition<TypeMapOf<T>> {
  readonly properties: T
}
