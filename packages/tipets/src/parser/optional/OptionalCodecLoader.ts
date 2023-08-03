import { Codec, OptionalCodec } from '../../codec'
import { OptionalSchema, Schema } from '../../schema'
import { TypeOf } from '../../type'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'

export class OptionalCodecLoader
  implements CodecLoader<OptionalSchema<Schema>>
{
  public is(schema: Schema): schema is OptionalSchema<Schema> {
    return OptionalSchema.is(schema)
  }

  public create(
    schema: OptionalSchema<Schema>,
    load: LoadCodecFn
  ): Codec<TypeOf<OptionalSchema<Schema>>> {
    return new OptionalCodec(load(schema.type))
  }
}
