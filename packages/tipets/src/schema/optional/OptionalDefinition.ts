import { Definition } from '../Definition'
import { Schema } from '../Schema'

export interface OptionalDefinition<T extends Schema> extends Definition {
  readonly type: T
}
