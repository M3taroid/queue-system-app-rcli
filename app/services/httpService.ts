import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import axiosRetry from 'axios-retry';
import {AppKeys} from '../constants';
import {ResponseBodyType} from '../types';
import {AppStorage} from "../utils";

const REACT_APP_BASE_URL = "https://queue-api.ets-mashallah.com"

let headers: any = {
    'content-type': 'application/json',
    'Auth-Device': 'app/android',
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers,
    timeout: 30000,
    withCredentials: true,
})

const authInterceptor = async (config: any) => {
    const token = await AppStorage.getStringItem(AppKeys.authToken);
    const newCongif = config;

    if (token) {
        newCongif.headers.Authorization = `Bearer ${token ? token : ''}`;
        newCongif.headers["Auth-Token"] = token ? token : '';
    }
    return newCongif;
};

axiosRetry(axiosInstance, {
    retries: 1,
    shouldResetTimeout: true,
    retryDelay: retryCount => {
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error: any) => {
        return (
            error == 'AxiosError: Network Error'
        );
    },
});


axiosInstance.interceptors.request.use(authInterceptor, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject('Request Error --> ' + error),
);

const parseRequestData = (data: string) => {
    try {
        return JSON.parse(data)
    }catch (e) {
        return {}
    }
}

async function response(response: AxiosResponse<ResponseBodyType>): Promise<any> {
    if (response?.config?.method?.toLowerCase() === "get" && response?.data?.error) {
        console.log(response?.data?.message);
    }
    if(typeof response.data !== "object") {
        console.log("Oups! Erreur inattendue. Réessayez SVP.", response)
        //return false
    }
    return Promise.resolve({
        statusCode: response?.status || 200,
        responseData: response?.data || '',
        requestData: response?.config?.data
            ? parseRequestData(response?.config?.data)
            : {},
    })
}


axiosInstance.interceptors.response.use(
    response,
    error => {
        const message =
            error.toString().replace('Axios', '').replace('Error:', '') || '';
        // if(!navigator?.onLine){
        //     console.log('Problème de connexion. Vérifiez SVP');
        // }
        if (!error || !error?.response || error == 'AxiosError: Network Error') {
            console.log(error);
            ///return;
        }
        // if (error?.response?.data && error.response.data.title && error.response.data.title.includes("Non authentifié")) {
        //     console.log("Please, session expired login again.")
        //     AppStorage.clearAllItems()
        //     window.location.href = "/login"
        //     return false
        // }
        return Promise.resolve({
            error: true,
            statusCode: error?.response?.status || 500,
            title: error?.response?.data?.title || '',
            message: error?.response?.data?.message || error?.response?.data?.description || message,
            data: error?.response?.data || '',
        });
    },
);

const get = async (url: string, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosInstance.get(url, config)
}

const post = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<ResponseBodyType> => {
    return await axiosInstance.post(url, data, config)
}

const put = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<ResponseBodyType> => {
    return await axiosInstance.put(url, data, config)
}

const _delete = async (url: string, config?: AxiosRequestConfig<any>): Promise<ResponseBodyType> => {
    return await axiosInstance.delete(url, config)
}

const patch = async (url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<ResponseBodyType> => {
    return await axiosInstance.patch(url, data, config)
}

const fetchFile = async ({url,  method}:{ url: string,  method: "GET" | "POST", filename?: string, format?: string }) => {
    const myHeaders = new Headers();
    const token = await AppStorage.getStringItem(AppKeys.authToken);
    myHeaders.append("Authorization", `Bearer ${token ? token : ''}`);
    myHeaders.append("Auth-Token", token ? token : '');
    const res = await fetch(`${REACT_APP_BASE_URL}${url}`, {method, headers: myHeaders})
    const blob = await res.blob()
    return blob
    // if(blob.type === "" || blob.type !== "application/pdf") {
    //     console.log("Une erreur est survenue ! Ressayez SVP.")
    //     return
    // }
    //fileDownload(blob, `${filename}.${format}`);
    //const fileURL = URL.createObjectURL(blob);
    //window.open(fileURL, '_blank');
}

const http = {
    get,
    post,
    put,
    patch,
    delete: _delete,
    fetchFile
};

export default http;
