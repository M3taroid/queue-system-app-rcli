export { default as http } from './httpService'

export {
    UseGetServiceDetail,
    UseGetServices,
    UseGetOpenServices,
} from "./requests/ServicesQueries"

export {
    UseAddOpenTicket
} from "./requests/TicketsQueries"

export {
    addTicketDocument,
    deleteTicketsDocument,
    updateTicketDocument,
    hotGetTodayTicketsDocByService,
    UseAddTicketDocument
} from "./documents/TicketsDocuments"