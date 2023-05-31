import { ObjectType } from '../../alias/ObjectType'
import { Schema } from '../Schema'

export type ObjectSchemaType<T extends Schema = Schema> = ObjectType<T>
