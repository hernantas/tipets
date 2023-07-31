import { Definition, Schema } from '../../schema'
import { TypeOf } from '../../type'

export interface NullableDefinition<T extends Schema>
  extends Definition<TypeOf<T> | null> {
  readonly type: T
}
