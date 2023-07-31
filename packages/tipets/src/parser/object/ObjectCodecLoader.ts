import { ObjectSchema, ObjectSchemaType, Schema } from '../../schema'
import { TypeOf } from '../../type'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'
import { ObjectCodec } from './ObjectCodec'

export class ObjectCodecLoader
  implements CodecLoader<ObjectSchema<ObjectSchemaType>>
{
  public is(schema: Schema): schema is ObjectSchema<ObjectSchemaType> {
    return ObjectSchema.is(schema)
  }

  public create(
    schema: ObjectSchema<ObjectSchemaType>,
    load: LoadCodecFn
  ): Codec<TypeOf<ObjectSchema<ObjectSchemaType>>> {
    return new ObjectCodec(
      Object.fromEntries(
        Object.entries(schema.properties).map(([key, schema]) => [
          key,
          load(schema),
        ])
      )
    )
  }
}
