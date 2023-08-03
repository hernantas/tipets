import { BigDecimal } from 'bigdecimal.js'
import { Schema, Signature } from 'tipets'

export class BigDecimalSchema extends Schema<BigDecimal> {
  public static readonly kind: string = 'big-decimal'

  private static readonly instance = new BigDecimalSchema({
    signature: BigDecimalSchema.signature(),
  })

  public override readonly kind: string = BigDecimalSchema.kind

  /**
   * Check if given schema is instance of {@link BigDecimalSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link BigDecimalSchema}, false
   *   otherwise
   */
  public static override is(schema: Schema): schema is BigDecimalSchema {
    return schema.kind === BigDecimalSchema.kind
  }

  /**
   * Create new signature for {@link BigDecimalSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('BigDecimal')
  }

  /**
   * Create new instance of {@link BigDecimalSchema}
   *
   * @returns A new instance of {@link BigDecimalSchema}
   */
  public static create(): BigDecimalSchema {
    return BigDecimalSchema.instance
  }

  public override is(value: unknown): value is BigDecimal {
    return value instanceof BigDecimal
  }

  /**
   * Add new validation constraint that check minimum number (`<=`)
   *
   * @param limit Minimum number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public min(
    limit: BigDecimal,
    message: string = `must greater than or equal to ${limit.toPlainString()}`
  ): this {
    return this.check({
      type: `bigdecimal.min`,
      args: { limit },
      validate: (v) => v.greaterThanOrEquals(limit),
      message,
    })
  }

  /**
   * Add new validation constraint that check maximum number (`<=`)
   *
   * @param limit Maximum number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public max(
    limit: BigDecimal,
    message: string = `must be less than or equal to ${limit.toPlainString()}`
  ): this {
    return this.check({
      type: `bigdecimal.max`,
      args: { limit },
      validate: (v) => v.lowerThanOrEquals(limit),
      message,
    })
  }

  /**
   * Add new validation constraint that check number to be greater than given
   * number (`>`)
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public greater(
    limit: BigDecimal,
    message: string = `must be greater than ${limit.toPlainString()}`
  ): this {
    return this.check({
      type: `bigdecimal.greater`,
      args: { limit },
      validate: (v) => v.greaterThan(limit),
      message,
    })
  }

  /**
   * Add new validation constraint that check number to be less than given
   * number (`<`)
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public less(
    limit: BigDecimal,
    message: string = `must be less than ${limit.toPlainString()}`
  ): this {
    return this.check({
      type: `bigdecimal.less`,
      args: { limit },
      validate: (v) => v.lowerThan(limit),
      message,
    })
  }

  /**
   * Add new validation constraint that number must be positive
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public positive(message: string = `must be positive number`): this {
    return this.check({
      type: `bigdecimal.positive`,
      validate: (v) => v.greaterThan(0),
      message,
    })
  }

  /**
   * Add new validation constraint that number must be negative
   *
   * @param limit Limit number
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public negative(message: string = `must be negative number`): this {
    return this.check({
      type: `bigdecimal.negative`,
      validate: (v) => v.lowerThan(-0),
      message,
    })
  }
}

/**
 * Create new instance of {@link BigDecimalSchema}
 *
 * @returns A new instance of {@link BigDecimalSchema}
 */
export function big(): BigDecimalSchema {
  return BigDecimalSchema.create()
}
