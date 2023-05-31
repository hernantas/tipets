export type IntersectOf<T> = (
  T extends unknown ? (key: T) => void : never
) extends (key: infer I) => void
  ? I
  : never
