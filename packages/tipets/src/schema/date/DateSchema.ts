import { Schema } from '../Schema'
import { kindSymbol } from '../kindSymbol'

export class DateSchema extends Schema<Date> {
  public override readonly [kindSymbol]: string = 'date'

  public override is(value: unknown): value is Date {
    return value instanceof Date
  }

  /**
   * Add new validation constraint that check minimum date (`<=`)
   *
   * @param limit Minimum date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public min(
    limit: Date,
    message: string = `must greater than or equal to ${limit.toISOString()}`
  ): this {
    return this.check({
      type: `date.min`,
      args: { limit },
      validate: (v) => v >= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check maximum date (`<=`)
   *
   * @param limit Maximum date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public max(
    limit: Date,
    message: string = `must be less than or equal to ${limit.toISOString()}`
  ): this {
    return this.check({
      type: `date.max`,
      args: { limit },
      validate: (v) => v <= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check date to be greater than given date
   * (`>`)
   *
   * @param limit Limit date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public greater(
    limit: Date,
    message: string = `must be greater than ${limit.toISOString()}`
  ): this {
    return this.check({
      type: `date.greater`,
      args: { limit },
      validate: (v) => v > limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check date to be less than given date
   * (`<`)
   *
   * @param limit Limit date
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public less(limit: Date, message?: string): this {
    return this.check({
      type: `date.less`,
      args: { limit },
      validate: (v) => v < limit,
      message:
        message ??
        `${this.get('label') ?? ''} must be less than ${limit.toISOString()}`,
    })
  }
}
