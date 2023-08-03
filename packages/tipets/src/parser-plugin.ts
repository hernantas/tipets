import { BooleanCodec, DateCodec, NumberCodec, StringCodec } from './codec'
import {
  ArrayCodecLoader,
  IntersectCodecLoader,
  LiteralCodecLoader,
  NullableCodecLoader,
  ObjectCodecLoader,
  OptionalCodecLoader,
  TupleCodecLoader,
  UnionCodecLoader,
} from './codec-loader'
import { Parser } from './parser'
import { boolean, date, number, string } from './schema'

export interface ParserPluginFn {
  (parser: Parser): void
}

export const defaultPlugin: ParserPluginFn = (parser) =>
  parser
    .addCodec(string(), new StringCodec())
    .addCodec(number(), new NumberCodec())
    .addCodec(boolean(), new BooleanCodec())
    .addCodec(date(), new DateCodec())
    .addLoader(new ArrayCodecLoader())
    .addLoader(new IntersectCodecLoader())
    .addLoader(new LiteralCodecLoader())
    .addLoader(new NullableCodecLoader())
    .addLoader(new ObjectCodecLoader())
    .addLoader(new OptionalCodecLoader())
    .addLoader(new TupleCodecLoader())
    .addLoader(new UnionCodecLoader())
