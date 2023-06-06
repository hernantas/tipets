import { string } from '../string/string'
import { ArraySchema } from './ArraySchema'
import { array } from './array'

describe('Array Schema', () => {
  const schema = array(string())

  it('Type Guard', () => {
    expect(schema.is([])).toBe(true)
    expect(schema.is(['ROBOT'])).toBe(true)
    expect(schema.is(['false'])).toBe(true)
    expect(schema.is(['0'])).toBe(true)
    expect(schema.is([false])).toBe(false)
    expect(schema.is([0])).toBe(false)
  })

  it('Instance checking', () => {
    expect(ArraySchema.is(schema)).toBe(true)
  })
})
