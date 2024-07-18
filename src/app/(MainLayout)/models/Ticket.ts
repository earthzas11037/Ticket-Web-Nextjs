import TicketStatus from "@/app/(MainLayout)/models/TicketStatus"
import { get } from "lodash"

class Ticket {
  id: number
  title: string
  description: string
  contact: string
  created: string
  updated: string
  status: TicketStatus

  constructor(json: any) {
    this.id = get(json, 'id', -1)
    this.title = get(json, 'title')
    this.description = get(json, 'description')
    this.contact = get(json, 'contact')
    this.created = get(json, 'created')
    this.updated = get(json, 'updated')
    const status = get(json, 'status')
    this.status = new TicketStatus(status)
  }
}

export default Ticket