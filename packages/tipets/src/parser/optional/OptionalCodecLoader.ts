import { Schema } from '../../schema/Schema'
import { TypeOf } from '../../schema/TypeOf'
import { OptionalSchema } from '../../schema/optional/OptionalSchema'
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
