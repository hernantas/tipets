import { string } from '../schema/string/string'
import { Parser } from './Parser'
import { StringCodec } from './string/StringCodec'

describe('Parser', () => {
  it('Empty parser should parse if same type as schema or throw', () => {
    const parser = new Parser()
    expect(parser.decode('Hello', string())).toBe('Hello')
    expect(() => parser.decode(4, string())).toThrow()
  })

  it('Basic parser should parse if type is supported', () => {
    const parser = new Parser().addCodec(string(), new StringCodec())
    expect(parser.decode('Hello', string())).toBe('Hello')
    expect(parser.decode(0, string())).toBe('0')
  })
})
