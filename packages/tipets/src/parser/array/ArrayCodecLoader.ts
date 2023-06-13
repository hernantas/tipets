import { TypeOf } from '../../TypeOf'
import { Schema } from '../../schema/Schema'
import { ArraySchema } from '../../schema/array/ArraySchema'
import { Codec } from '../Codec'
import { CodecLoader } from '../CodecLoader'
import { LoadCodecFn } from '../LoadCodecFn'
import { ArrayCodec } from './ArrayCodec'

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
