import { Type } from './Type'
import { TypeOf } from './TypeOf'

export type TypeMapOf<T> = {
  [K in keyof T]: T[K] extends Type ? TypeOf<T[K]> : never
}
