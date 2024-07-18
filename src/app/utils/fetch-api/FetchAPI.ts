import Axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import APIRequest from '@/app/common/interface/APIRequest'
import { StatusCode } from '@/app/common/enum/API/StatusCodeEnum'
import APIResponse from '@/app/common/models/api/APIResponse'
import { fetchWithNext } from '@/app/utils/fetch-api/FetchAPINext'

const CancelToken = Axios.CancelToken

// let cancelTokens: (() => void)[] = []

export function fetch(apiRequest: APIRequest): Promise<APIResponse> {
  if (apiRequest.fetcherType === 'NEXT_FETCH') return fetchWithNext(apiRequest)
  const options = createAxiosOptions(apiRequest)
  const startTime = (new Date()).valueOf()
  return new Promise((resolve, reject) => {
    Axios(options)
      .then(response => {
        const responseModel = new APIResponse(response.data, response.status == StatusCode.SUCCESS)
        resolve(responseModel)
      })
      .catch(async err => {
        if (Axios.isCancel(err)) {
          console.log("REQUEST Cancelled", options)
        }
        try {
          const statusCode = _.get(err, 'response.status')
          if ((statusCode === 403 || statusCode === 401) && !!apiRequest.refreshToken) {
            await apiRequest.refreshToken()
            return resolve(fetch(apiRequest))
          }
        } catch (error) {
        }
        if (err.response) {
          reject(new APIResponse(err.response.data, false))
        } else {
          reject(new APIResponse(err, false))
        }
      }).finally(() => {
        const isServer = typeof window === "undefined";
        if (!isServer) return
        console.log(`API Response Time: ${apiRequest.url}`)
        console.log(`API Response Time: ${(new Date()).valueOf() - startTime} ms`)
        console.log('-----')
      })
  })
}

// export function cancelAllRequests() {
//   cancelTokens.forEach(x => x())
//   cancelTokens = []
// }

function createAxiosOptions(apiRequest: APIRequest): AxiosRequestConfig {
  const body = apiRequest.makeBody()
  return {
    baseURL: apiRequest.baseUrl ? apiRequest.baseUrl : '',
    url: apiRequest.url,
    timeout: 60000,
    headers: {
      ...(!!apiRequest.makeHeader ? apiRequest.makeHeader() : {})
    },
    // cancelToken: new CancelToken(c => cancelTokens.push(c)),
    method: apiRequest.method,
    data: !_.isEmpty(body) ? body : undefined,
    params: {
      ...(apiRequest.makeQuery() || {}),
    },
  }
}

export default { fetch };