import { string } from '../../schema'
import { TupleSchema } from './TupleSchema'

describe('Tuple Schema', () => {
  const schema = TupleSchema.create(string().length(4), string().length(6))

  it('Type Guard', () => {
    expect(schema.is(['Hello', 'World'])).toBe(true)
    expect(schema.is(['Hello', 'World', '!!!'])).toBe(false)
    expect(schema.is(['Hello'])).toBe(false)
    expect(schema.is([])).toBe(false)
  })

  it('Validation', () => {
    expect(schema.validate(['1234', '123456'])).toHaveLength(0)
    expect(schema.validate(['1', '1'])).toHaveLength(2)
  })

  it('Instance checking', () => {
    expect(TupleSchema.is(schema)).toBe(true)
  })
})
