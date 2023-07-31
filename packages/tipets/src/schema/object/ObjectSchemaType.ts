import { Schema } from '../../schema'
import { ObjectType } from '../../type-alias'

export type ObjectSchemaType<T extends Schema = Schema> = ObjectType<T>
