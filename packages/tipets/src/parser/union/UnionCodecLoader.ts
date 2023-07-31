import { MemberType } from '../../alias/MemberType'
import { Schema } from '../../schema'
import { MemberSchemaType } from '../../schema/MemberSchemaType'
import { UnionSchema } from '../../schema/union/UnionSchema'
import { TypeOf } from '../../type'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'
import { UnionCodec } from './UnionCodec'
import { UnionCodecInfoMap } from './UnionCodecInfoMap'

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
