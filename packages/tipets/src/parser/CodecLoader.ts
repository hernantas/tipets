import { Codec } from '../codec'
import { Schema } from '../schema'
import { TypeOf } from '../type'
import { LoadCodecFn } from './LoadCodecFn'

export interface CodecLoader<S extends Schema = Schema> {
  is(schema: Schema): schema is S
  create(schema: S, load: LoadCodecFn): Codec<TypeOf<S>>
}
