import { boolean } from '../../schema'
import { date } from '../../schema/date/date'
import { number } from '../../schema/number/number'
import { string } from '../../schema/string/string'
import { ParserPluginFn } from '../ParserPluginFn'
import { ArrayCodecLoader } from '../array/ArrayCodecLoader'
import { BooleanCodec } from '../boolean/BooleanCodec'
import { DateCodec } from '../date/DateCodec'
import { IntersectCodecLoader } from '../intersect/IntersectCodecLoader'
import { LiteralCodecLoader } from '../literal/LiteralCodecLoader'
import { NullableCodecLoader } from '../nullable/NullableCodecLoader'
import { NumberCodec } from '../number/NumberCodec'
import { ObjectCodecLoader } from '../object/ObjectCodecLoader'
import { OptionalCodecLoader } from '../optional/OptionalCodecLoader'
import { StringCodec } from '../string/StringCodec'
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
