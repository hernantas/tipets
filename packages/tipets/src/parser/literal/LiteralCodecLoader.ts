import { LiteralSchema, Schema } from '../../schema'
import { LiteralType } from '../../type-alias'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LiteralCodec } from './LiteralCodec'

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
