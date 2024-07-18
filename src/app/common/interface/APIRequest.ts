import { HTTPMethod } from "@/app/common/enum/API/HTTPMethod"

export type APIRequestFetchOptions = {
  useInternal?: boolean
}

interface APIRequest {
  baseUrl?: string
  method: HTTPMethod
  url: string
  makeQuery: () => any
  makeBody: () => any
  makeHeader?: () => any
  refreshToken?: () => void
  withoutTimestamp?: boolean
  cacheRevalidateDuration?: number
  fetcherType?: 'NEXT_FETCH' | 'AXIOS'
}

export default APIRequest