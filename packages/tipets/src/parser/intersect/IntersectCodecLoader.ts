import { Codec, CodecMap, IntersectCodec } from '../../codec'
import { IntersectSchema, MemberSchemaType, Schema } from '../../schema'
import { TypeOf } from '../../type'
import { MemberType } from '../../type-alias'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'

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
