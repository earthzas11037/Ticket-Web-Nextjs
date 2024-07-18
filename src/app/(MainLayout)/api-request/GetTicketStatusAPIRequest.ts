import APIConfig from "@/app/common/config/APIConfig"
import { HTTPMethod } from "@/app/common/enum/API/HTTPMethod"
import APIRequest from "@/app/common/interface/APIRequest"

class GetTicketStatusAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.ticket}/ticket/status`

  constructor() {
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {}
  }
}

export default GetTicketStatusAPIRequest
