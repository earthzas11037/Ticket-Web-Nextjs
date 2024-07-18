import Ticket from "@/app/(MainLayout)/models/Ticket"
import TicketStatus from "@/app/(MainLayout)/models/TicketStatus"
import APIConfig from "@/app/common/config/APIConfig"
import { HTTPMethod } from "@/app/common/enum/API/HTTPMethod"
import APIRequest from "@/app/common/interface/APIRequest"

export interface CreateTicketBody {
  title: string
  description?: string
  contact?: string
  status: TicketStatus
}

class CreateTicketAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.POST
  url: string = `${APIConfig.ticket}/ticket`

  data: CreateTicketBody

  constructor(data: Ticket) {
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

export default CreateTicketAPIRequest
