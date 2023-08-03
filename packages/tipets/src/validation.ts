import { Violation } from './violation'

/** A function to check if given value is valid */
export type ValidationFunction<T = unknown> = (value: T) => boolean

/** Rule of validation */
export interface ValidationRule<T = unknown> extends Violation {
  /** Function to check if given value is valid */
  readonly validate: ValidationFunction<T>
}
