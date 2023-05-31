import { Output } from './Output'
import { OutputOf } from './OutputOf'

export type OutputMapOf<T> = {
  [K in keyof T]: T[K] extends Output ? OutputOf<T[K]> : never
}
