/** Alias for constructor type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorType<T = unknown, Args extends unknown[] = any[]> = {
  new (...args: Args): T
}
