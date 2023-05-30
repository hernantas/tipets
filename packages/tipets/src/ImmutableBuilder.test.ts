import { ImmutableBuilder } from './ImmutableBuilder'

describe('Extendable', () => {
  it('Construct', () => {
    const b = new ImmutableBuilder({
      initial: '',
    })
    expect(b.get('initial')).toBe('')
  })

  it('Set', () => {
    const b = new ImmutableBuilder({
      key: '',
    })
    const changed = b.set('key', 'value')
    expect(b).not.toBe(changed)
    expect(b.get('key')).toBe('')
    expect(changed.get('key')).toBe('value')
  })
})
