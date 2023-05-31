import { TypeOf } from '../../type/TypeOf'
import { Schema } from '../Schema'
import { Definition } from './Definition'

export interface ArrayDefinition<S extends Schema>
  extends Definition<TypeOf<S>> {
  /** Inner type schema */
  readonly type: S
}
