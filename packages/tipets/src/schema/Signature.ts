export class Signature {
  public static create(name: string, ...generics: Signature[]): Signature {
    return new Signature(name, generics)
  }

  private constructor(
    private readonly name: string,
    private readonly generics: Signature[],
    private readonly attributes: [string, string][] = [],
    private readonly properties: [string, Signature][] = []
  ) {}

  public attribute(key: string, value: string): Signature {
    const attr: [string, string] = [key, value]
    return new Signature(
      this.name,
      this.generics,
      this.attributes.concat([attr]),
      this.properties
    )
  }

  public property(key: string, value: Signature): Signature {
    const prop: [string, Signature] = [key, value]
    return new Signature(
      this.name,
      this.generics,
      this.attributes,
      this.properties.concat([prop])
    )
  }

  public toString(): string {
    let result: string = this.name

    if (this.generics.length > 0) {
      result += `<${this.generics
        .map((generic) => generic.toString())
        .join(',')}>`
    }

    if (this.attributes.length > 0) {
      result += `(${this.attributes
        .map(([key, value]) => `${key}:${value}`)
        .join(',')})`
    }

    if (this.properties.length > 0) {
      result += `{${this.properties
        .map(([key, value]) => `${key}:${value.toString()}`)
        .join(',')}}`
    }

    return result
  }
}
