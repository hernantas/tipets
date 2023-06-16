import { ParserPluginFn } from 'tipets'
import { BigDecimalCodec } from './BigDecimalCodec'
import { big } from './big'

export const bigdecimalPlugin: ParserPluginFn = (parser) => {
  parser.addCodec(big(), new BigDecimalCodec())
}
