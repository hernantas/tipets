import { number } from '../number/number'
import { string } from '../string/string'
import { object } from './object'

describe('Object Schema', () => {
  const schema = object({
    _string: string().length(5),
    _number: number().min(0),
  })

  it('Type Guard', () => {
    expect(
      schema.is({
        _string: 'Hello',
        _number: 0,
      })
    ).toBe(true)
    expect(
      schema.is({
        _string: 'Hello',
        _number: 0,
        _boolean: false,
      })
    ).toBe(true)
    expect(
      schema.is({
        _string: 0,
        _number: 'Hello',
      })
    ).toBe(false)
    expect(
      schema.is({
        _string: 'Hello',
      })
    ).toBe(false)
  })

  it('Validation', () => {
    expect(
      schema.validate({
        _string: 'Hello',
        _number: 0,
      })
    ).toHaveLength(0)
    expect(
      schema.validate({
        _string: 'Hell',
        _number: -1,
      })
    ).toHaveLength(2)
  })
})
