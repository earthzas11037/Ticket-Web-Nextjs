import CreateTicketAPIRequest from '@/app/(MainLayout)/api-request/CreateTicketAPIRequest'
import GetListTicketAPIRequest from '@/app/(MainLayout)/api-request/GetListTicketAPIRequest'
import GetTicketStatusAPIRequest from '@/app/(MainLayout)/api-request/GetTicketStatusAPIRequest'
import UpdateTicketAPIReuqest from '@/app/(MainLayout)/api-request/UpdateTicketAPIReuqest'
import Ticket from '@/app/(MainLayout)/models/Ticket'
import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import { fetch } from '@/app/utils/fetch-api/FetchAPI'
import _, { get } from 'lodash'

class TicketManager {
  static default: TicketManager = new TicketManager()

  getTicketList(): Promise<Ticket[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const apiReuqest = new GetListTicketAPIRequest()
        const dataJSON = await fetch(apiReuqest)
        const data: Ticket[] = get(dataJSON, 'data', []).map((x: Ticket) => new Ticket(x))

        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  getTicketStatus(): Promise<TicketStatus[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const apiReuqest = new GetTicketStatusAPIRequest()
        const dataJSON = await fetch(apiReuqest)
        const data = get(dataJSON, 'data', []).map((x: TicketStatus) => new TicketStatus(x))

        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  createTicket(value: Ticket): Promise<Ticket> {
    return new Promise(async (resolve, reject) => {
      try {
        const apiReuqest = new CreateTicketAPIRequest(value)
        const dataJSON = await fetch(apiReuqest)
        const data = new Ticket(get(dataJSON, 'data', null))

        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  updateTicket(value: Ticket): Promise<Ticket> {
    return new Promise(async (resolve, reject) => {
      try {
        const apiReuqest = new UpdateTicketAPIReuqest(value)
        const dataJSON = await fetch(apiReuqest)
        const data = new Ticket(get(dataJSON, 'data', null))

        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}

export default TicketManager
