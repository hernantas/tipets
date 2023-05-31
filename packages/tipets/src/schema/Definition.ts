import { Key } from '../alias/Key'
import { ValidationRule } from './ValidationRule'

/** Schema definition */
export interface Definition<T> {
  /** List of rules for current schema */
  readonly rules?: ValidationRule<T>[]

  readonly [key: Key]: unknown
}
