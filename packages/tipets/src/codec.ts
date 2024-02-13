import { UnsupportedTypeError, UnsupportedValueError } from './error'
import { Schema } from './schema'
import { LiteralType, MemberType, ObjectType, TupleType } from './type-alias'
import { IntersectMap, UnionMap } from './type-helper'

export interface Decoder<T = unknown, I = unknown> {
  decode(input: I): T
}

export interface Encoder<T = unknown, O = unknown> {
  encode(value: T): O
}

export interface Codec<T = unknown, O = unknown, I = unknown>
  extends Decoder<T, I>,
    Encoder<T, O> {}

/** Warp given types with {@link Codec} */
export type CodecMap<T> = {
  [K in keyof T]: Codec<T[K]>
}

/**
 * Fallback codec. If codec is not found for particular schema, use its own
 * schema to decode/encode
 */
export class DefaultCodec<T> implements Codec<T> {
  public constructor(private readonly schema: Schema<T>) {}

  public decode(value: unknown): T {
    if (this.schema.is(value)) {
      return value
    }

    throw new UnsupportedTypeError(value)
  }

  public encode(value: T): T {
    return value
  }
}

export class ArrayCodec<T> implements Codec<T[]> {
  public constructor(private readonly codec: Codec<T>) {}

  public decode(value: unknown): T[] {
    const values = Array.isArray(value)
      ? value
      : value !== undefined && value !== null
      ? [value]
      : []
    return values.map((value) => this.codec.decode(value))
  }

  public encode(value: T[]): unknown {
    return value.map((value) => this.codec.encode(value))
  }
}

export class BooleanCodec implements Codec<boolean> {
  public decode(value: unknown): boolean {
    return !!value
  }

  public encode(value: boolean): unknown {
    return value
  }
}

export class DateCodec implements Codec<Date> {
  public decode(value: unknown): Date {
    if (typeof value === 'string') {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new UnsupportedValueError(value)
      }
      return date
    }

    if (value instanceof Date) {
      return value
    }

    throw new UnsupportedTypeError(value)
  }

  public encode(value: Date): unknown {
    return value.toUTCString()
  }
}

export class IntersectCodec<T extends MemberType>
  implements Codec<IntersectMap<T>>
{
  private readonly codecs: CodecMap<T>
  public constructor(...codecs: CodecMap<T>) {
    this.codecs = codecs
  }

  public decode(value: unknown): IntersectMap<T> {
    return this.codecs
      .map((codec) => codec.decode(value))
      .filter((v) => typeof v === 'object')
      .reduce((result, v) => merge(result, v), {}) as IntersectMap<T>
  }

  public encode(value: IntersectMap<T>): unknown {
    return this.codecs
      .map((codec) => codec.encode(value))
      .filter((v) => typeof v === 'object')
      .reduce((result, v) => merge(result, v), {}) as IntersectMap<T>
  }
}

/**
 * Merge 2 given object
 *
 * @param base Base to be merged
 * @param target Target to be merged
 * @returns A new object from the merger
 */
function merge<T, U>(base: T, target: U): T & U {
  return {
    ...target,
    ...base,
  }
}

export class LiteralCodec<T extends LiteralType> implements Codec<T> {
  public constructor(private readonly value: T) {}

  public decode(value: unknown): T {
    if (this.value === value) {
      return this.value
    }
    throw new UnsupportedValueError(value)
  }

  public encode(value: T): unknown {
    return value
  }
}

export class NullableCodec<T> implements Codec<T | null> {
  public constructor(private readonly codec: Codec<T>) {}

  public decode(value: unknown): T | null {
    return value === null ? null : this.codec.decode(value)
  }

  public encode(value: T | null): unknown {
    return value === null ? null : this.codec.encode(value)
  }
}

export class NumberCodec implements Codec<number> {
  public decode(value: unknown): number {
    if (typeof value === 'number') {
      return value
    }

    if (value === undefined) {
      return 0
    }

    if (value === 'NaN') {
      return NaN
    } else if (value === '-NaN') {
      return -NaN
    }

    // try automatic conversion
    return Number(value)
  }

  public encode(value: number): unknown {
    return value
  }
}

export class ObjectCodec<T extends ObjectType> implements Codec<T> {
  public constructor(private readonly codecs: CodecMap<T>) {}

  public decode(value: unknown): T {
    if (typeof value === 'object' && value !== null) {
      return Object.fromEntries(
        Object.entries<Codec>(this.codecs).map(([key, codec]) => [
          key,
          codec.decode((value as ObjectType)[key]),
        ])
      ) as T
    }
    throw new UnsupportedTypeError(value)
  }

  public encode(value: T): unknown {
    return Object.fromEntries(
      Object.entries<Codec>(this.codecs).map(([key, codec]) => [
        key,
        codec.encode(value[key]),
      ])
    )
  }
}

export class OptionalCodec<T> implements Codec<T | undefined> {
  public constructor(private readonly codec: Codec<T>) {}

  public decode(value: unknown): T | undefined {
    return value === undefined ? undefined : this.codec.decode(value)
  }

  public encode(value: T | undefined): unknown {
    return value === undefined ? undefined : this.codec.encode(value)
  }
}

export class StringCodec implements Codec<string> {
  public decode(value: unknown): string {
    if (typeof value === 'string') {
      return value
    }
    if (value === null || value === undefined) {
      return ''
    }
    return String(value)
  }

  public encode(value: string): unknown {
    return value
  }
}

export class TupleCodec<T extends TupleType> implements Codec<T> {
  private readonly codecs: CodecMap<T>

  public constructor(...codecs: CodecMap<T>) {
    this.codecs = codecs
  }

  public decode(value: unknown): T {
    if (Array.isArray(value)) {
      return this.codecs.map((codec, index) => codec.decode(value[index])) as T
    }
    throw new UnsupportedTypeError(value)
  }

  public encode(value: T): unknown {
    return this.codecs.map((codec, index) => codec.encode(value[index])) as T
  }
}

export type UnionCodecInfoMap<T extends MemberType> = {
  [K in keyof T]: {
    is: (value: unknown) => value is T[K]
    codec: Codec<T[K]>
  }
}

export class UnionCodec<T extends MemberType> implements Codec<UnionMap<T>> {
  private readonly infos: UnionCodecInfoMap<T>

  public constructor(...infos: UnionCodecInfoMap<T>) {
    this.infos = infos
  }

  public decode(value: unknown): UnionMap<T> {
    // try to check if type match with the codec
    for (const info of this.infos) {
      if (info.is(value)) {
        return info.codec.decode(value)
      }
    }

    // brute force, try to decode using all available codec
    for (const info of this.infos) {
      try {
        return info.codec.decode(value)
      } catch (e) {
        // do nothing
      }
    }

    throw new UnsupportedTypeError(value)
  }

  public encode(value: UnionMap<T>): unknown {
    for (const info of this.infos) {
      if (info.is(value)) {
        return info.codec.encode(value)
      }
    }

    throw new UnsupportedTypeError(value)
  }
}
