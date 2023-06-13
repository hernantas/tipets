import { LoadCodecFn } from '../LoadCodecFn'
import { DefaultCodec } from './DefaultCodec'

export const loadDefaultCodec: LoadCodecFn = (schema) => {
  return new DefaultCodec(schema)
}
