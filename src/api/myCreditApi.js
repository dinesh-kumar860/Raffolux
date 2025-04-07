import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchMyCreditWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyCreditWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchOlderCreditWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchOlderCreditWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// export const fetchMyCreditWithLogin = async () => await apiClient.postAPICall(routesApi.fetchMyCreditWithLogin, {} ).then(res => res.data);
// export const fetchOlderCreditWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchOlderCreditWithLogin, data ).then(res => res.data);
