import APIConfig from "@/app/common/config/APIConfig"
import { HTTPMethod } from "@/app/common/enum/API/HTTPMethod"
import APIRequest from "@/app/common/interface/APIRequest"

class GetTicketDetailAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.ticket}/ticket/detail`

  constructor(id: string) {
    this.url = `${this.url}/${id}`
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {}
  }
}

export default GetTicketDetailAPIRequest
