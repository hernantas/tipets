import {
  ArrayCodec,
  Codec,
  CodecMap,
  IntersectCodec,
  LiteralCodec,
  NullableCodec,
  ObjectCodec,
  OptionalCodec,
  TupleCodec,
  UnionCodec,
  UnionCodecInfoMap,
} from './codec'
import {
  ArraySchema,
  IntersectSchema,
  LiteralSchema,
  MemberSchemaType,
  NullableSchema,
  ObjectSchema,
  ObjectSchemaType,
  OptionalSchema,
  Schema,
  TupleSchema,
  TupleSchemaType,
  UnionSchema,
} from './schema'
import { TypeOf } from './type'
import { LiteralType, MemberType, TupleType } from './type-alias'

export interface LoadCodecFn {
  <S extends Schema>(schema: S): Codec<S>
}

export interface CodecLoader<S extends Schema = Schema> {
  is(schema: Schema): schema is S
  create(schema: S, load: LoadCodecFn): Codec<TypeOf<S>>
}

export class ArrayCodecLoader implements CodecLoader<ArraySchema<Schema>> {
  public is(schema: Schema): schema is ArraySchema<Schema> {
    return ArraySchema.is(schema)
  }

  public create(
    schema: ArraySchema<Schema>,
    load: LoadCodecFn
  ): Codec<TypeOf<ArraySchema<Schema>>> {
    return new ArrayCodec(load(schema.innerType))
  }
}

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

export class LiteralCodecLoader
  implements CodecLoader<LiteralSchema<LiteralType>>
{
  public is(schema: Schema): schema is LiteralSchema<LiteralType> {
    return LiteralSchema.is(schema)
  }

  public create(schema: LiteralSchema<LiteralType>): Codec<LiteralType> {
    return new LiteralCodec(schema.value)
  }
}

export class NullableCodecLoader
  implements CodecLoader<NullableSchema<Schema>>
{
  public is(schema: Schema): schema is NullableSchema<Schema> {
    return NullableSchema.is(schema)
  }

  public create(
    schema: NullableSchema<Schema>,
    load: LoadCodecFn
  ): Codec<TypeOf<NullableSchema<Schema>>> {
    return new NullableCodec(load(schema.innerType))
  }
}

export class ObjectCodecLoader
  implements CodecLoader<ObjectSchema<ObjectSchemaType>>
{
  public is(schema: Schema): schema is ObjectSchema<ObjectSchemaType> {
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

export class OptionalCodecLoader
  implements CodecLoader<OptionalSchema<Schema>>
{
  public is(schema: Schema): schema is OptionalSchema<Schema> {
    return OptionalSchema.is(schema)
  }

  public create(
    schema: OptionalSchema<Schema>,
    load: LoadCodecFn
  ): Codec<TypeOf<OptionalSchema<Schema>>> {
    return new OptionalCodec(load(schema.innerType))
  }
}

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
