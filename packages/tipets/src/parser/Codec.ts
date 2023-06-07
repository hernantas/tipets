export interface Codec<T = unknown, O = unknown, I = unknown> {
  decode(value: I): T
  encode(value: T): O
}
