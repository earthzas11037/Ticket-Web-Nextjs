import APIConfig from "@/app/common/config/APIConfig"
import { HTTPMethod } from "@/app/common/enum/API/HTTPMethod"
import APIRequest from "@/app/common/interface/APIRequest"

class GetListTicketAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.ticket}/ticket`

  constructor() {
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {}
  }
}

export default GetListTicketAPIRequest
