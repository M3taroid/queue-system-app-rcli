import { endpoints } from "../../constants"
import {UseGetDetailQuery, UseGetQuery} from "../QueryManager"
import {GetQueryParams} from "../../types";

export const UseGetServices = (options?: GetQueryParams) => UseGetQuery({
    identifier: "Services",
    options: options,
    endpoint: endpoints.services,
})
export const UseGetOpenServices = (options?: GetQueryParams) => UseGetQuery({
    identifier: "OpenServices",
    options: options,
    endpoint: endpoints.openServices,
})
export const UseGetServiceDetail = (id: string, options?: GetQueryParams) => UseGetDetailQuery({
    id: id,
    identifier: "Service",
    options: options,
    endpoint: endpoints.services,
})