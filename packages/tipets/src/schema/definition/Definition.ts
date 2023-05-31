import { Key } from '../../alias/Key'
import { ValidationRule } from '../validation/ValidationRule'

/** Schema definition */
export interface Definition {
  /** List of rules for current schema */
  readonly rules?: ValidationRule<any>[]

  readonly [key: Key]: unknown
}
