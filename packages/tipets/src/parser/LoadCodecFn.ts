import { Codec } from '../codec'
import { Schema } from '../schema'

export interface LoadCodecFn {
  <S extends Schema>(schema: S): Codec<S>
}
