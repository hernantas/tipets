import { Codec } from './Codec'

/** Warp given types with {@link Codec} */
export type CodecMap<T> = {
  [K in keyof T]: Codec<T[K]>
}
