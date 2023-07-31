import { Schema } from '../../schema/Schema'
import { TypeOf } from '../../type'
import { NullableSchema } from '../../schema/nullable/NullableSchema'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'
import { NullableCodec } from './NullableCodec'

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
