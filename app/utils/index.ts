//import {appPermissions} from "@/constants";
import {PermissionActionType} from "../types";
import moment from "moment";

export { default as AppStorage } from './AppStorage'
export { default as AppPermissions } from './AppPermissions'

export const getTodayDate = (format?: "fr" | "en") => moment().format(format == "en" ? 'YYYY-MM-DD' : "DD-MM-YYYY")

export const formatUrlParams = (params?: { [key: string]: any }) => {
    if (!params) return ''
    let url = ''
    Object.keys(params).map((item, index) => {
        if (index === 0) url = params[item] ? `?${item}=${params[item] || ''}` : `?r=''`
        else url += params[item] ? `&${item}=${params[item] || ''}` : ""
        return item
    })
    return url
}

export const getQueryKey = (key: string, params?: { [key: string]: any }) => {
    if (!params) return [key]
    const options = Object.values(params).map(item => item)
    return [key, ...options]
}

export const HasPermissions = (permission:  string, userPermissions: any, action: PermissionActionType = "reader") => {
    //if (permission === appPermissions.none) return true
    if (userPermissions) {
        if (userPermissions[permission] && userPermissions[permission][action]?.toString() === "1") return true
    }
    return false
}

export const sortArrayByDate = (arr: any[], dateField: string, order: "asc" | "desc" = "asc") => {
    return [...arr].sort((a, b) => {
        console.log("A", new Date(a[dateField])!.getTime())
        console.log("B", new Date(b[dateField])!.getTime())
        if (order === "asc") return new Date(a[dateField])!.getTime() - new Date(b[dateField])!.getTime();
        else return new Date(b[dateField])!.getTime() - new Date(a[dateField])!.getTime();
    });

}
export const sortArrayByDateMoment = (arr: any[], dateField: string, order: "asc" | "desc" = "asc") => {
    return [...arr].sort((a: any, b: any) => {
        if (order === "asc") return  moment(b[dateField]).diff(moment(a[dateField]));
        else return moment(a[dateField]).diff(moment(b[dateField]));
    });
}

export const sortArrayByNumber = (arr: any[], dateField: string, order: "asc" | "desc" = "asc") => {
    return [...arr].sort((a: any, b: any) => {
        if (order === "asc") return  parseFloat(a[dateField]) - parseFloat(b[dateField]);
        else return parseFloat(b[dateField]) - parseFloat(a[dateField]);
    });
}