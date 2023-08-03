import { Codec, NullableCodec } from '../../codec'
import { NullableSchema, Schema } from '../../schema'
import { TypeOf } from '../../type'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'

export class NullableCodecLoader
  implements CodecLoader<NullableSchema<Schema>>
{
  public is(schema: Schema): schema is NullableSchema<Schema> {
    return NullableSchema.is(schema)
  }

  public create(
    schema: NullableSchema<Schema>,
    load: LoadCodecFn
  ): Codec<TypeOf<NullableSchema<Schema>>> {
    return new NullableCodec(load(schema.type))
  }
}
