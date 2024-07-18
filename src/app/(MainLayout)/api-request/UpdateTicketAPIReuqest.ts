import Ticket from "@/app/(MainLayout)/models/Ticket"
import TicketStatus from "@/app/(MainLayout)/models/TicketStatus"
import APIConfig from "@/app/common/config/APIConfig"
import { HTTPMethod } from "@/app/common/enum/API/HTTPMethod"
import APIRequest from "@/app/common/interface/APIRequest"

export interface UpdateTicketBody {
  title: string
  description: string
  contact: string
  status: TicketStatus
}

class UpdateTicketAPIReuqest implements APIRequest {
  method: HTTPMethod = HTTPMethod.PATCH
  url: string = `${APIConfig.ticket}/ticket/update`

  data: UpdateTicketBody

  constructor(data: Ticket) {
    this.url = `${this.url}/${data.id}`
    this.data = {
      title: data.title,
      description: data.description,
      contact: data.contact,
      status: data.status
    }
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return this.data
  }
}

export default UpdateTicketAPIReuqest
