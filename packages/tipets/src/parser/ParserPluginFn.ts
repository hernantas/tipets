import { Parser } from '../parser'

export interface ParserPluginFn {
  (parser: Parser): void
}
