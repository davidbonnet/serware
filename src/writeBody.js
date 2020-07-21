import { pipeline } from 'stream'

import { isString } from 'lodash'

export function writeBody(next) {
  return async (request) => {
    const response = await next(request)
    return new Promise((resolve, reject) => {
      const { data } = response
      if (isString(data)) {
        response.write(data, response.dataEncoding, () => resolve(response))
        return
      }
      pipeline(data, response, (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(response)
      })
    })
  }
}
