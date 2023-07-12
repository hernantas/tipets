# @tipets/bigdecimal.js

Tipets extension support for [bigdecimal.js](https://www.npmjs.com/package/bigdecimal.js) library

**`tipets` is still in alpha. Expect bugs and api changes!**

## Quick Start

Install

```
npm install @tipets/bigdecimal tipets
```

Add parser plugin

```ts
const parser = Parser.create().addPlugin(bigdecimalPlugin)

// then use parser normally
```

## Built-in

### Schema

| Type       | Typescript   | Builder |
| ---------- | ------------ | ------- |
| BigDecimal | `BigDecimal` | `big`   |

### Parser Plugin

| Name             | Description                      |
| ---------------- | -------------------------------- |
| bigdecimalPlugin | Add BigDecimal `Codec` to Parser |
