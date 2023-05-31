import { TypeOf } from '../../TypeOf'
import { Definition } from '../Definition'
import { Schema } from '../Schema'

export interface NullableDefinition<T extends Schema>
  extends Definition<TypeOf<T>> {
  readonly type: T
}
