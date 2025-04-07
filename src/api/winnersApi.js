import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchlatestWinnersWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchlatestWinnersWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export const fetchWinnersMonthWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchWinnersMonthWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchWinnersMonthwiseDataWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchWinnersMonthwiseDataWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchWinnersDatewiseDataWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchWinnersDatewiseDataWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchWinnersDatewiseDataFilterWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchWinnersDatewiseDataFilterWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


// export const fetchWinnersMonthWithLogin = async () => await apiClient.postAPICall(routesApi.fetchWinnersMonthWithLogin, {} ).then(res => res.data);
// export const fetchWinnersMonthwiseDataWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchWinnersMonthwiseDataWithLogin, data ).then(res => res.data);
// export const fetchWinnersDatewiseDataWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchWinnersDatewiseDataWithLogin, data ).then(res => res.data);
// export const fetchWinnersDatewiseDataFilterWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchWinnersDatewiseDataFilterWithLogin, data ).then(res => res.data);
// export const fetchlatestWinnersWithLogin = async () => await apiClient.postAPICall(routesApi.fetchlatestWinnersWithLogin, {} ).then(res => res.data);




