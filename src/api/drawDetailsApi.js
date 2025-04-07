import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchDrawDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchDrawDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const sortDrawticketsPurchaseWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.sortDrawticketsPurchaseWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// export const fetchDrawDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchDrawDetailsWithLogin, data).then(res => res.data);
// export const sortDrawticketsPurchaseWithLogin = async (data) => await apiClient.postAPICall(routesApi.sortDrawticketsPurchaseWithLogin, data).then(res => res.data);