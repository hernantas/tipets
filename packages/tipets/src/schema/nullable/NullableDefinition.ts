import { Definition } from '../Definition'
import { Schema } from '../Schema'

export interface NullableDefinition<T extends Schema> extends Definition {
  readonly type: T
}
