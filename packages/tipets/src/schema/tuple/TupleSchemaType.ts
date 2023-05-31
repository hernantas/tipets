import { TupleType } from '../../alias/TupleType'
import { Schema } from '../Schema'

export type TupleSchemaType<T extends Schema = Schema> = TupleType<T>
