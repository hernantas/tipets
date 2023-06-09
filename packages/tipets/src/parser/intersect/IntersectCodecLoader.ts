import { MemberType } from '../../alias/MemberType'
import { MemberSchemaType } from '../../schema/MemberSchemaType'
import { Schema } from '../../schema/Schema'
import { TypeOf } from '../../schema/TypeOf'
import { IntersectSchema } from '../../schema/intersect/IntersectSchema'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { CodecMap } from '../CodecMap'
import { LoadCodecFn } from '../LoadCodecFn'
import { IntersectCodec } from './IntersectCodec'

export class IntersectCodecLoader
  implements CodecLoader<IntersectSchema<MemberSchemaType>>
{
  public is(schema: Schema): schema is IntersectSchema<MemberSchemaType> {
    return IntersectSchema.is(schema)
  }

  public create(
    schema: IntersectSchema<MemberSchemaType>,
    load: LoadCodecFn
  ): Codec<TypeOf<IntersectSchema<MemberSchemaType>>> {
    return new IntersectCodec(
      ...(schema.items.map((item) => load(item)) as CodecMap<MemberType>)
    )
  }
}
