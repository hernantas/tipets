import { ParserPluginFn } from 'tipets'
import { BigDecimalCodec } from './codec'
import { big } from './schema'

export const bigdecimalPlugin: ParserPluginFn = (parser) => {
  parser.addCodec(big(), new BigDecimalCodec())
}
