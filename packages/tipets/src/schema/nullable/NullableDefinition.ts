import { Definition } from '../Definition'
import { Schema } from '../Schema'
import { TypeOf } from '../TypeOf'

export interface NullableDefinition<T extends Schema>
  extends Definition<TypeOf<T> | null> {
  readonly type: T
}
