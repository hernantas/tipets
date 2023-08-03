import { ArrayCodec, Codec } from '../../codec'
import { ArraySchema, Schema } from '../../schema'
import { TypeOf } from '../../type'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'

export class ArrayCodecLoader implements CodecLoader<ArraySchema<Schema>> {
  public is(schema: Schema): schema is ArraySchema<Schema> {
    return ArraySchema.is(schema)
  }

  public create(
    schema: ArraySchema<Schema>,
    load: LoadCodecFn
  ): Codec<TypeOf<ArraySchema<Schema>>> {
    return new ArrayCodec(load(schema.type))
  }
}
