import {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type StackNavigationParams = {
    Home: undefined;
};
export type NavigationType = NativeStackNavigationProp<StackNavigationParams>;

export type ResponseBodyType = {
    error: boolean,
    statusCode: number,
    title: string,
    message: string,
    data: any,
    requestData?: object,
}
export type GetQueryParams = {
    fields?: string
    limit?: number
    sortColumn?: string
    sortDirection?: 'asc' | 'desc'
    relations?: string
    pagination?: boolean
    page?: number
    noPermission?: 0 | 1
    staleTime?: number
    enabled?: boolean
    [key: string]: any
}

export type PermissionActionType =  "reader" | "creator" | "updater" | "deleter" | "detailer" | "validator" | "exporter"
