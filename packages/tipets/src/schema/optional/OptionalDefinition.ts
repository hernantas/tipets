import { Definition } from '../Definition'
import { Schema } from '../Schema'
import { TypeOf } from '../TypeOf'

export interface OptionalDefinition<T extends Schema>
  extends Definition<TypeOf<T> | undefined> {
  readonly type: T
}
