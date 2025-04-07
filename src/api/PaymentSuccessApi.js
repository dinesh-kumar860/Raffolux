import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchFromCartOnPaymentWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchFromCartOnPaymentWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// export const fetchFromCartOnPaymentWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchFromCartOnPaymentWithLogin, data).then(res => res.data);
