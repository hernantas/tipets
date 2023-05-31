import { Violation } from '../Violation'
import { ValidationFunction } from './ValidationFunction'

/** Rule of validation */
export interface ValidationRule<T = unknown> extends Violation {
  /** Function to check if given value is valid */
  readonly validate: ValidationFunction<T>
}
