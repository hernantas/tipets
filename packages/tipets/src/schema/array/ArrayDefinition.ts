import { Definition } from '../Definition'
import { Schema } from '../Schema'

export interface ArrayDefinition<S extends Schema> extends Definition {
  /** Inner type schema */
  readonly type: S
}
