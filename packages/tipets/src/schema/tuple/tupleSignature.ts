import { Signature } from '../Signature'
import { TupleSchemaType } from './TupleSchemaType'

/**
 * Create new signature for {@link TupleSchema}
 *
 * @returns A new signature instance
 */
export function tupleSignature(items: TupleSchemaType): Signature {
  return Signature.create('Tuple', ...items.map((item) => item.signature))
}
