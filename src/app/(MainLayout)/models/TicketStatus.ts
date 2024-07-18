import { get } from "lodash"

class TicketStatus {
  id: number
  name: string

  constructor(json: any) {
    this.id = get(json, 'id', -1)
    this.name = get(json, 'name')
  }
}

export default TicketStatus