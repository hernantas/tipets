import { Schema } from '../../schema'
import { OptionalSchema } from '../../schema/optional/OptionalSchema'
import { TypeOf } from '../../type'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'
import { OptionalCodec } from './OptionalCodec'

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
