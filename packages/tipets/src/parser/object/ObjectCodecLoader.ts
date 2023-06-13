import { TypeOf } from '../../TypeOf'
import { Definition } from '../../schema/Definition'
import { Schema } from '../../schema/Schema'
import { ObjectSchema } from '../../schema/object/ObjectSchema'
import { ObjectSchemaType } from '../../schema/object/ObjectSchemaType'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'
import { ObjectCodec } from './ObjectCodec'

export class ObjectCodecLoader
  implements CodecLoader<ObjectSchema<ObjectSchemaType>>
{
  public is(
    schema: Schema<any, Definition<any>>
  ): schema is ObjectSchema<ObjectSchemaType> {
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
