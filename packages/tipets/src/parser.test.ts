import { Parser } from './parser'
import { ArrayCodecLoader } from './parser/array/ArrayCodecLoader'
import { StringCodec } from './parser/string/StringCodec'
import { array, string } from './schema'

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

  it('Parser should return `Result` when using try decode/encode', () => {
    const parser = Parser.empty()
    expect(parser.tryDecode('Hello', string())).toStrictEqual({
      success: true,
      value: 'Hello',
    })
    expect(parser.tryDecode(0, string())).toMatchObject({ success: false })
  })
})
