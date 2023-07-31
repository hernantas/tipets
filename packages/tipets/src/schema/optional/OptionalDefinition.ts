import { Definition, Schema } from '../../schema'
import { TypeOf } from '../../type'

export interface OptionalDefinition<T extends Schema>
  extends Definition<TypeOf<T> | undefined> {
  readonly type: T
}
