import { LiteralType } from '../../alias/LiteralType'
import { Definition } from '../Definition'

export interface LiteralDefinition<T extends LiteralType> extends Definition {
  /** Literal value */
  readonly value: T
}
