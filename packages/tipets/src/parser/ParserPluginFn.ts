import { Parser } from './Parser'

export interface ParserPluginFn {
  (parser: Parser): void
}
