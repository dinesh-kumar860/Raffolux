import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const getRafflePageDataWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.getRafflePageDataWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchTopPrizesWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchTopPrizesWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const fetchAllPrizesWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchAllPrizesWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchTicketsSelectorWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchTicketsSelectorWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteItemFromCartWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.deleteItemFromCartWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// export const getRafflePageDataWithLogin = async (data) => await apiClient.postAPICall(routesApi.getRafflePageDataWithLogin, data).then(res => res.data);
// export const fetchTopPrizesWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchTopPrizesWithLogin, data).then(res => res.data);
// export const fetchAllPrizesWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchAllPrizesWithLogin, data).then(res => res.data);
// export const fetchTicketsSelectorWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchTicketsSelectorWithLogin, data).then(res => res.data);
// export const deleteItemFromCartWithLogin = async (data) => await apiClient.postAPICall(routesApi.deleteItemFromCartWithLogin, data).then(res => res.data);