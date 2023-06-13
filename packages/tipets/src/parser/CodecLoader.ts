import { TypeOf } from '../TypeOf'
import { Schema } from '../schema/Schema'
import { Codec } from './Codec'
import { LoadCodecFn } from './LoadCodecFn'

export interface CodecLoader<S extends Schema = Schema> {
  is(schema: Schema): schema is S
  create(schema: S, load: LoadCodecFn): Codec<TypeOf<S>>
}
