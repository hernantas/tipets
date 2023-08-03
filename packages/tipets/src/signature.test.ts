import { Signature } from './signature'

describe('Signature', () => {
  it('Empty Class', () => {
    const signature = Signature.create('SimpleClass')
    expect(signature.toString()).toBe('SimpleClass')
  })

  it('Class with Generic', () => {
    const stringSignature = Signature.create('string')
    const signature = Signature.create(
      'SimpleClass',
      stringSignature,
      stringSignature
    )
    expect(signature.toString()).toBe('SimpleClass<string,string>')
  })

  it('Class With Property', () => {
    const stringSignature = Signature.create('string')
    const signature = Signature.create('SimpleClass')
      .property('propA', stringSignature)
      .property('propB', stringSignature)
    expect(signature.toString()).toBe('SimpleClass{propA:string,propB:string}')
  })

  it('Class with Attribute', () => {
    const signature = Signature.create('SimpleClass')
      .attribute('keyA', 'valueA')
      .attribute('keyB', 'valueB')
    expect(signature.toString()).toBe('SimpleClass(keyA:valueA,keyB:valueB)')
  })

  it('Class with All', () => {
    const stringSignature = Signature.create('string')
    const signature = Signature.create(
      'SimpleClass',
      stringSignature,
      stringSignature
    )
      .property('propA', stringSignature)
      .property('propB', stringSignature)
      .attribute('keyA', 'valueA')
      .attribute('keyB', 'valueB')
    expect(signature.toString()).toBe(
      'SimpleClass<string,string>(keyA:valueA,keyB:valueB){propA:string,propB:string}'
    )
  })
})
