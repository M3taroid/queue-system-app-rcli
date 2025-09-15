import {UsePostQuery} from "../QueryManager.ts";
import {endpoints} from "../../constants";

export const UseAddOpenTicket = () => UsePostQuery(endpoints.openTickets, "addOpenTicket")
