import { TypeOf } from '../../TypeOf'
import { TupleType } from '../../alias/TupleType'
import { Schema } from '../../schema/Schema'
import { TupleSchema } from '../../schema/tuple/TupleSchema'
import { TupleSchemaType } from '../../schema/tuple/TupleSchemaType'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'
import { CodecMap } from '../CodecMap'
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
