import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchMyRafflesWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyRafflesWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchMyPendingRafflesWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyPendingRafflesWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchMyRafflesTicketsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyRafflesTicketsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


// export const fetchMyRafflesWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchMyRafflesWithLogin, data).then(res => res.data);
// export const fetchMyPendingRafflesWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchMyPendingRafflesWithLogin, data).then(res => res.data);
// export const fetchMyRafflesTicketsWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchMyRafflesTicketsWithLogin, data).then(res => res.data);
