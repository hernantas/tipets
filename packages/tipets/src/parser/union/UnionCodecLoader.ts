import { Codec, UnionCodec, UnionCodecInfoMap } from '../../codec'
import { MemberSchemaType, Schema, UnionSchema } from '../../schema'
import { TypeOf } from '../../type'
import { MemberType } from '../../type-alias'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'

export class UnionCodecLoader
  implements CodecLoader<UnionSchema<MemberSchemaType>>
{
  public is(schema: Schema): schema is UnionSchema<MemberSchemaType> {
    return UnionSchema.is(schema)
  }

  public create(
    schema: UnionSchema<MemberSchemaType>,
    load: LoadCodecFn
  ): Codec<TypeOf<UnionSchema<MemberSchemaType>>> {
    return new UnionCodec(
      ...(schema.items.map((item) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        is: (value: unknown): value is any => item.is(value),
        codec: load(item),
      })) as UnionCodecInfoMap<MemberType>)
    )
  }
}
