import { ResultFailed } from './ResultFailed'
import { ResultSuccess } from './ResultSuccess'

export type Result<T> = ResultSuccess<T> | ResultFailed
