import { At } from './At'
import { ObjectType } from './ObjectType'

/** Merge both object into simple object */
export type Merge<T1 extends ObjectType, T2 extends ObjectType> = {
  [K in keyof (T1 & T2)]: At<T1, K> | At<T2, K>
}
