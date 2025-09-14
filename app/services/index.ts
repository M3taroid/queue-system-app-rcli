export { default as http } from './httpService'

export {
    UseGetServiceDetail,
    UseGetServices,
    UseGetOpenServices,
} from "./requests/ServicesQueries"

// export {
//     UseGetPackagerDetail,
//     UseUpdateTicket,
//     UseGetTickets,
//     UseAddTicket,
//     UseAddTicketCall,
//     UseGetTicketCalls
// } from "./requests/TicketsQueries"
//
export {
    addTicketDocument,
    deleteTicketsDocument,
    updateTicketDocument
} from "./documents/TicketsDocuments"