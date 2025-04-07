import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchTotalRaisedCharitiesCount = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchTotalRaisedCharitiesCount, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchAllCharities = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchAllCharities, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchIndividualCharity = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchIndividualCharity, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const charitySupportWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.charitySupportWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateCharityWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.updateCharityWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


// export const fetchTotalRaisedCharitiesCount = async () => await apiClient.postAPICall(routesApi.fetchTotalRaisedCharitiesCount, {}).then(res => res.data);
// export const charitySupportWithLogin = async () => await apiClient.postAPICall(routesApi.charitySupportWithLogin, {}).then(res => res.data);
// export const fetchAllCharities = async () => await apiClient.postAPICall(routesApi.fetchAllCharities, {}).then(res => res.data);
// export const fetchIndividualCharity = async (data) => await apiClient.postAPICall(routesApi.fetchIndividualCharity, data).then(res => res.data);
// export const updateCharityWithLogin = async (data) => await apiClient.postAPICall(routesApi.updateCharityWithLogin, data).then(res => res.data);

