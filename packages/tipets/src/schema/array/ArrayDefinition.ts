import { TypeOf } from '../../TypeOf'
import { Definition } from '../Definition'
import { Schema } from '../Schema'

export interface ArrayDefinition<S extends Schema>
  extends Definition<TypeOf<S>> {
  /** Inner type schema */
  readonly type: S
}
