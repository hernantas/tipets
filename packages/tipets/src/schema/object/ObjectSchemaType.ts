import { ObjectType } from '../../alias/ObjectType'
import { Schema } from '../../schema'

export type ObjectSchemaType<T extends Schema = Schema> = ObjectType<T>
