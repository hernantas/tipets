import { TypeOf } from '../TypeOf'
import { Schema } from '../schema/Schema'

export interface Codec<S extends Schema = Schema, O = unknown, I = unknown> {
  decode(value: I): TypeOf<S>
  encode(value: TypeOf<S>): O
}
