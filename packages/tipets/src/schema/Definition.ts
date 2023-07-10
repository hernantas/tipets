import { Key } from '../alias/Key'
import { Signature } from './Signature'
import { ValidationRule } from './ValidationRule'

/** Schema definition */
export interface Definition<T> {
  /** Signature for current definition */
  readonly signature: Signature

  /** List of rules for current schema */
  readonly rules?: ValidationRule<T>[]

  readonly [key: Key]: unknown
}
