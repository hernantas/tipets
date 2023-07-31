import { boolean, number } from '../../schema'
import { OptionalSchema } from '../optional/OptionalSchema'
import { string } from '../string/string'
import { ObjectSchema } from './ObjectSchema'

describe('Object Schema', () => {
  const schema = ObjectSchema.create({
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

  it('Extend', () => {
    const s = schema.extend({
      _boolean: boolean(),
    })
    expect(s.props).toHaveProperty('_string')
    expect(s.props).toHaveProperty('_number')
    expect(s.props).toHaveProperty('_boolean')
  })

  it('Partial', () => {
    const s = schema.partial()
    expect(s.props._string).toBeInstanceOf(OptionalSchema)
    expect(s.props._number).toBeInstanceOf(OptionalSchema)
  })

  it('Pick', () => {
    const s = schema.pick('_string')
    expect(s.props).toHaveProperty('_string')
    expect(s.props).not.toHaveProperty('_number')
  })

  it('Omit', () => {
    const s = schema.omit('_number')
    expect(s.props).toHaveProperty('_string')
    expect(s.props).not.toHaveProperty('_number')
  })

  it('Instance checking', () => {
    expect(ObjectSchema.is(schema)).toBe(true)
  })
})
