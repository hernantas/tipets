import { Key } from './alias/Key'
import { ObjectType } from './alias/ObjectType'

/** Contain violation information (what constraint is being violated) */
export interface Violation {
  /** Path to the violation */
  readonly path?: Key[]
  /** Type of violation, should be unique depend on violation type */
  readonly type: string
  /** Default message */
  readonly message?: string
  /** Relevant information for this violation */
  readonly args?: ObjectType
}
