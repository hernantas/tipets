import { Definition } from '../Definition'
import { Schema } from '../Schema'
import { TypeOf } from '../TypeOf'

export interface ArrayDefinition<S extends Schema>
  extends Definition<TypeOf<S>[]> {
  /** Inner type schema */
  readonly type: S
}
