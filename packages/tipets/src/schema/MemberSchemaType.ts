import { MemberType } from '../alias/MemberType'
import { Schema } from './Schema'

export type MemberSchemaType<S extends Schema = Schema> = MemberType<S>
