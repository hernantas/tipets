import { BooleanCodec, DateCodec, NumberCodec, StringCodec } from '../../codec'
import { boolean, date, number, string } from '../../schema'
import { ParserPluginFn } from '../ParserPluginFn'
import { ArrayCodecLoader } from '../array/ArrayCodecLoader'
import { IntersectCodecLoader } from '../intersect/IntersectCodecLoader'
import { LiteralCodecLoader } from '../literal/LiteralCodecLoader'
import { NullableCodecLoader } from '../nullable/NullableCodecLoader'
import { ObjectCodecLoader } from '../object/ObjectCodecLoader'
import { OptionalCodecLoader } from '../optional/OptionalCodecLoader'
import { TupleCodecLoader } from '../tuple/TupleCodecLoader'
import { UnionCodecLoader } from '../union/UnionCodecLoader'

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
