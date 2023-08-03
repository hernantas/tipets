import { Codec, LiteralCodec } from '../../codec'
import { LiteralSchema, Schema } from '../../schema'
import { LiteralType } from '../../type-alias'
import { CodecLoader } from '../CodecLoader'

export class LiteralCodecLoader
  implements CodecLoader<LiteralSchema<LiteralType>>
{
  public is(schema: Schema): schema is LiteralSchema<LiteralType> {
    return LiteralSchema.is(schema)
  }

  public create(schema: LiteralSchema<LiteralType>): Codec<LiteralType> {
    return new LiteralCodec(schema.value)
  }
}
