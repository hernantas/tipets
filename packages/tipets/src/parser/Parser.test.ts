import { array } from '../schema/array/array'
import { string } from '../schema/string/string'
import { Parser } from './Parser'
import { ArrayCodecLoader } from './array/ArrayCodecLoader'
import { StringCodec } from './string/StringCodec'

describe('Parser', () => {
  it('Empty parser should parse if same type as schema or throw', () => {
    const parser = Parser.empty()
    expect(parser.decode('Hello', string())).toBe('Hello')
    expect(() => parser.decode(4, string())).toThrow()
  })

  it('Basic parser should parse if type is supported', () => {
    const parser = Parser.empty().addCodec(string(), new StringCodec())
    expect(parser.decode('Hello', string())).toBe('Hello')
    expect(parser.decode(0, string())).toBe('0')
  })

  it('Parser with Loader should dynamically create new codec', () => {
    const parser = Parser.empty()
      .addCodec(string(), new StringCodec())
      .addLoader(new ArrayCodecLoader())
    expect(
      parser.decode(['Hello', 'World', '!!!'], array(string()))
    ).toStrictEqual(['Hello', 'World', '!!!'])
  })
})
