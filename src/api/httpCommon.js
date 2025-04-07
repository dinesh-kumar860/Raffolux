import axios from 'axios'
import axiosRetry from 'axios-retry'

import { API_URL ,CROSS_SELLING_API_URL} from '@env';

import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';
import { fortmatData, isEmptyObject } from '../utils/utils';

import * as Common from '../helpers/common';

import Toast from 'react-native-simple-toast';


export const axiosInstance = axios.create({
    baseURL: `${API_URL}`,
    timeout: 10000
});

axiosInstance.defaults.headers = {
    'Content-Type': 'application/json',
}

const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000;
    const randomMs = 1000 * Math.random();
    return seconds + randomMs;
};

axiosRetry(axiosInstance, {
    retries: 2,
    retryDelay,
    // retry on Network Error & 5xx responses
    retryCondition: axiosRetry.isRetryableError,
});

// const DEBUG = process.env.NODE_ENV === "development";

function errorResponseHandler(error) {

    const errorMessage =
        error.response?.data?.error ||
        error.response?.data ||
        error.message ||
        error ||
        Common.common.UnknownError;
    

    // if (DEBUG) {
    //     console.error(`Error: ${fortmatData(error)}`);
    // }
    if (errorMessage.message == "Internal server error") {
        // Toast.show(errorMessage.message, Toast.SHORT)
        console.log(errorMessage.message)
    }
    if (errorMessage !== 'Network Error' && errorMessage.message !== "Internal server error") {
        Toast.show(errorMessage, Toast.SHORT)
    }

    return false;

}

// Add a request interceptor
axiosInstance.interceptors.request.use(async (config) => {
    // Do something before request is sent
    // config.headers.test = 'I am only a header!'; // EX: Add jwt token
    let token = await RaffoluxAsyncStorage.getItem(Common.Home.Token);
    config.headers.Authorization = token;

    if (isEmptyObject(config.data)) {
        config.data = {};
    }

    // if (DEBUG) { console.info(`Request: ${fortmatData(config)}`); }

    return config;
}, errorResponseHandler);

// apply interceptor on response
axiosInstance.interceptors.response.use((response) => {
    // if (DEBUG) { console.info(`Response: ${fortmatData(response)}`); }

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, errorResponseHandler);

export const getAPICall = async (url, data) => await axiosInstance.get(url, data);
export const postAPICall = async (url, data) => await axiosInstance.post(url, data);
export const putAPICall = async (url, data) => await axiosInstance.put(url, data);
export const deleteAPICall = async (url, data) => await axiosInstance.delete(url, data);