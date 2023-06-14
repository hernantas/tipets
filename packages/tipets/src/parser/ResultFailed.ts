import { Violation } from '../schema/Violation'

export interface ResultFailed {
  success: false
  violations: Violation[]
}
