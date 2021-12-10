import { reduce, split } from 'lodash-es'

import { getAcceptedEncoding } from './getAcceptedEncoding.js'

export function getAcceptedEncodingList(acceptEncoding) {
  return reduce(
    split(acceptEncoding, ','),
    function (result, encoding) {
      const acceptedEncoding = getAcceptedEncoding(encoding)
      if (acceptedEncoding != null) {
        result.push(acceptedEncoding)
      }
      return result
    },
    [],
  )
}
