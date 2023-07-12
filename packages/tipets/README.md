# tipets

Typescript-first schema declaration, validation library and contextual transformation. Inspired from [io-ts](https://www.npmjs.com/package/io-ts) and [joi](https://www.npmjs.com/package/joi).

**`tipets` is still in alpha. Expect bugs and api changes!**

## Features

- Typescript-first library which support type inference and schema type properly.
- Support class-based or schema-based declaration
- Powerful schema declaration, can be used to type-guard and validation. Can also be reused for multiple use case such as json, bson, or other
- Type coercion, allow data transformation from/to different type for input/output.
- Fast and Extensible, build your own schema/codec/parser

## Quick Start

Install

```
npm install tipets
```

Using schema:

```ts
// create schema
const schema = object({
  id: number(),
  firstName: string(),
  lastName: optional(string()),
  active: boolean(),
})

// type-guard
if (schema.is(value)) {
  // validation
  const violations = schema.validate(value)
}
```

Using parser:

```ts
// create default parser
const parser = Parser.create()

// decode/encode
const decoded = parser.decode(value)
const encoded = parser.encode(decoded)

// decode without exception
const decoded = parser.tryDecode(value)
if (decoded.success) {
  // do whatever with Result
  const result = decoded.value

  // encode without exception
  const encoded = parser.tryEncode(result)
}
```

## Built-in

### Schema

| Type      | Typescript       | Builder                             |
| --------- | ---------------- | ----------------------------------- |
| string    | `string`         | `t.string()`                        |
| number    | `number`         | `t.number()`                        |
| boolean   | `boolean`        | `t.boolean()`                       |
| literal   | `'A'`            | `t.literal('A')`                    |
| unknown   | `unknown`        | `t.unknown()`                       |
| any       | `any`            | `t.any()`                           |
| null      | `null`           | `t.null()`                          |
| nullable  | `A \| null`      | `t.nullable(t.type(A))`             |
| undefined | `undefined`      | `t.undefined()`                     |
| optional  | `A \| undefined` | `t.undefined(t.type(A))`            |
| array     | `array`          | `t.array(T)`                        |
| type\*    | `A`              | `t.type(A)`                         |
| object    | `{a:A}`          | `t.object({a: t.type(A)})`          |
| union     | `A \| B`         | `t.union(t.type(A), t.type(B))`     |
| intersect | `A & B`          | `t.intersect(t.type(A), t.type(B))` |

\*: `type` is still in development because I can't decide if

### Parser

| Name   | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| Parser | Parser with some some built in primitive `Codec`. You mostly use this |
