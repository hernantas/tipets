import { number } from '../../schema'
import { object } from '../object/object'
import { string } from '../string/string'
import { IntersectSchema } from './IntersectSchema'
import { intersect } from './intersect'

describe('Intersect Schema', () => {
  const schema = IntersectSchema.create(
    object({ _string: string().length(5) }),
    object({ _number: number().min(0) })
  )

  it('Type Guard', () => {
    expect(schema.is({ _string: 'Hello', _number: 0 })).toBe(true)
    expect(schema.is({ _string: 'Hello' })).toBe(false)
    expect(schema.is({ _number: 0 })).toBe(false)

    const impossible = intersect(string(), number())
    expect(impossible.is('Hello')).toBe(false)
    expect(impossible.is(0)).toBe(false)
  })

  it('Validation', () => {
    expect(schema.validate({ _string: 'Hello', _number: 0 })).toHaveLength(0)
    expect(schema.validate({ _string: 'Hell', _number: -1 })).toHaveLength(2)
  })

  it('Instance checking', () => {
    expect(IntersectSchema.is(schema)).toBe(true)
  })
})
