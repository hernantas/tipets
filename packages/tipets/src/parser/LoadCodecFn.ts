import { Schema } from '../schema'
import { Codec } from './Codec'

export interface LoadCodecFn {
  <S extends Schema>(schema: S): Codec<S>
}
