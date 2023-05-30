/** Alias for constructor type */
export type ConstructorType<T = unknown, Args extends unknown[] = any[]> = {
  new (...args: Args): T
}
