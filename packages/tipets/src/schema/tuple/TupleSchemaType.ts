import { TupleType } from '../../type-alias'
import { Schema } from '../../schema'

export type TupleSchemaType<T extends Schema = Schema> = TupleType<T>
