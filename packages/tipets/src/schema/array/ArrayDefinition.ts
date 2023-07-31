import { Definition, Schema } from '../../schema'
import { TypeOf } from '../../type'

export interface ArrayDefinition<S extends Schema>
  extends Definition<TypeOf<S>[]> {
  /** Inner type schema */
  readonly type: S
}
