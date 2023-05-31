import { string } from '../string/string'
import { tuple } from './tuple'

describe('Tuple Schema', () => {
  const schema = tuple(string().length(4), string().length(6))

  it('Is', () => {
    expect(schema.is(['Hello', 'World'])).toBe(true)
    expect(schema.is(['Hello', 'World', '!!!'])).toBe(false)
    expect(schema.is(['Hello'])).toBe(false)
    expect(schema.is([])).toBe(false)
  })

  it('Validation', () => {
    expect(schema.validate(['1234', '123456'])).toHaveLength(0)
    expect(schema.validate(['1', '1'])).toHaveLength(2)
  })
})
