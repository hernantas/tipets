import { TupleType } from '../../alias/TupleType'
import { Schema } from '../../schema'
import { TupleSchema } from '../../schema/tuple/TupleSchema'
import { TupleSchemaType } from '../../schema/tuple/TupleSchemaType'
import { TypeOf } from '../../type'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { CodecMap } from '../CodecMap'
import { LoadCodecFn } from '../LoadCodecFn'
import { TupleCodec } from './TupleCodec'

export class TupleCodecLoader
  implements CodecLoader<TupleSchema<TupleSchemaType>>
{
  public is(schema: Schema): schema is TupleSchema<TupleSchemaType> {
    return TupleSchema.is(schema)
  }

  public create(
    schema: TupleSchema<TupleSchemaType>,
    load: LoadCodecFn
  ): Codec<TypeOf<TupleSchema<TupleSchemaType>>> {
    return new TupleCodec(
      ...(schema.items.map((item) => load(item)) as CodecMap<TupleType>)
    )
  }
}
