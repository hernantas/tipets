import { Schema, TupleSchema, TupleSchemaType } from '../../schema'
import { TypeOf } from '../../type'
import { TupleType } from '../../type-alias'
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
