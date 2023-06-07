/**
 * This error indicate parse is failed because value is not supported or
 * invalid, but its type is supported
 */
export class UnsupportedValueError extends Error {
  public override readonly name: string = 'UnsupportedValueError'

  public constructor(public readonly value: unknown) {
    super(`Cannot parse given value type`)
  }
}
