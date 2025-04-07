import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const cartPaymentWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.cartPaymentWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchCartCountWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchCartCountWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// export const cartPaymentWithLogin = async (data) => await apiClient.postAPICall(routesApi.cartPaymentWithLogin, data).then(res => res.data);
// export const fetchCartCountWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchCartCountWithLogin, data).then(res => res.data);