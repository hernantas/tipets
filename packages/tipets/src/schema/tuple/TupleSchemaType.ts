import { TupleType } from '../../alias/TupleType'
import { Schema } from '../../schema'

export type TupleSchemaType<T extends Schema = Schema> = TupleType<T>
