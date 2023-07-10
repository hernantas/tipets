import { LiteralType } from '../../alias/LiteralType'
import { Definition } from '../Definition'

export interface LiteralDefinition<T extends LiteralType>
  extends Definition<T> {
  /** Literal value */
  readonly value: T
}
