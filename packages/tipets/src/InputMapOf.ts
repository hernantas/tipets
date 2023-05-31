import { Input } from './Input'
import { InputOf } from './InputOf'

export type InputMapOf<T> = {
  [K in keyof T]: T[K] extends Input ? InputOf<T[K]> : never
}
