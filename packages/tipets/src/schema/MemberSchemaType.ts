import { Schema } from '../schema'
import { MemberType } from '../type-alias'

export type MemberSchemaType<S extends Schema = Schema> = MemberType<S>
