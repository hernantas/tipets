import { Schema } from '../Schema'
import { Signature } from '../Signature'
import { kindSymbol } from '../kindSymbol'

export class StringSchema extends Schema<string> {
  public static readonly [kindSymbol]: string = 'string'

  private static readonly instance: StringSchema = new StringSchema({
    signature: StringSchema.signature(),
  })

  public override readonly [kindSymbol]: string = StringSchema[kindSymbol]

  /**
   * Check if given schema is instance of {@link StringSchema}
   *
   * @param schema Schema to be checked
   * @returns True if schema is instance of {@link StringSchema}, false otherwise
   */
  public static override is(schema: Schema): schema is StringSchema {
    return schema[kindSymbol] === StringSchema[kindSymbol]
  }

  /**
   * Create new signature for {@link StringSchema}
   *
   * @returns A new signature instance
   */
  public static signature(): Signature {
    return Signature.create('String')
  }

  /**
   * Create new instance of {@link StringSchema}
   *
   * @returns A new instance of {@link StringSchema}
   */
  public static create(): StringSchema {
    return StringSchema.instance
  }

  public override is(value: unknown): value is string {
    return typeof value === 'string'
  }

  /**
   * Add new validation constraint that check minimum character length (`<=`)
   *
   * @param limit Minimum character length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public min(
    limit: number,
    message: string = `must be more than ${limit} characters`
  ): this {
    return this.check({
      type: `string.min`,
      args: { limit },
      validate: (v) => v.length >= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check maximum character length (`>=`)
   *
   * @param limit Maximum character length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public max(
    limit: number,
    message: string = `must be less than ${limit} characters`
  ): this {
    return this.check({
      type: `string.max`,
      args: { limit },
      validate: (v) => v.length <= limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check character length
   *
   * @param limit Character length
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public length(
    limit: number,
    message: string = `must be at ${limit} characters`
  ): this {
    return this.check({
      type: `string.length`,
      args: { limit },
      validate: (v) => v.length === limit,
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is empty
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public notEmpty(message: string = `must not empty`): this {
    return this.check({
      type: `string.notEmpty`,
      validate: (v) => v.length > 0,
      message,
    })
  }

  /**
   * Add new validation constraint that check if string match given regex
   * pattern
   *
   * @param pattern Regex pattern for validation
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public pattern(
    pattern: RegExp,
    message: string = `must match "${pattern.source}" pattern`
  ): this {
    return this.check({
      type: `string.pattern`,
      args: { pattern },
      validate: (v) => pattern.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid alphanumeric
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public alphanumeric(message: string = `must be valid alphanumeric`): this {
    return this.check({
      type: `string.alphanumeric`,
      args: { pattern: regex.alphanumeric },
      validate: (v) => regex.alphanumeric.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid base64
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public base64(message: string = `must be valid base64`): this {
    return this.check({
      type: `string.base64`,
      args: { pattern: regex.base64 },
      validate: (v) => regex.base64.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid E-Mail
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public email(message: string = `must be valid email`): this {
    return this.check({
      type: `string.email`,
      args: { pattern: regex.email },
      validate: (v) => regex.email.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid IP character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public ip(message: string = `must be valid ip`): this {
    return this.check({
      type: `string.ip`,
      args: { pattern: regex.ip },
      validate: (v) => regex.ip.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid numeric
   * character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public numeric(
    message: string = `must only contain numeric characters`
  ): this {
    return this.check({
      type: `string.numeric`,
      args: { pattern: regex.numeric },
      validate: (v) => regex.numeric.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid uuid character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public uuid(message: string = `must be valid UUID`): this {
    return this.check({
      type: `string.uuid`,
      args: { pattern: regex.uuid },
      validate: (v) => regex.uuid.test(v),
      message,
    })
  }

  /**
   * Add new validation constraint that check if string is valid url character
   *
   * @param message Optional message when rule is violated
   * @returns A new instance with new rules added
   */
  public url(message: string = `must be valid URL`): this {
    return this.check({
      type: `string.url`,
      args: { pattern: regex.url },
      validate: (v) => regex.url.test(v),
      message,
    })
  }
}

const regex = {
  alphanumeric: /^[a-zA-Z0-9]+$/,
  base64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  numeric: /^[0-9]+$/,
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
}
