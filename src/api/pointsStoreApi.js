import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchPointsStoreBalanceWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchPointsStoreBalanceWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchPointsClaimRenderWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchPointsClaimRenderWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchPointsStoreWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchPointsStoreWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const displayAddressWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.displayAddressWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addAddressWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.addAddressWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateAddressDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.updateAddressDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteAddressDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.deleteAddressDetailsWithLogin, data);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updatePointsClaimWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.updatePointsClaimWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchPointsClaimWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchPointsClaimWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// export const fetchPointsStoreBalanceWithLogin = async () => await apiClient.postAPICall(routesApi.fetchPointsStoreBalanceWithLogin, {} ).then(res => res.data);
// export const fetchPointsClaimRenderWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchPointsClaimRenderWithLogin, data ).then(res => res.data);
// export const fetchPointsStoreWithLogin = async () => await apiClient.postAPICall(routesApi.fetchPointsStoreWithLogin, {} ).then(res => res.data);
// export const displayAddressWithLogin = async () => await apiClient.postAPICall(routesApi.displayAddressWithLogin, {} ).then(res => res.data);
// export const addAddressWithLogin = async (data) => await apiClient.postAPICall(routesApi.addAddressWithLogin, data ).then(res => res.status);
// export const updateAddressDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.updateAddressDetailsWithLogin, data ).then(res => res.data);
// export const deleteAddressDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.deleteAddressDetailsWithLogin, data ).then(res => res);
// export const updatePointsClaimWithLogin = async (data) => await apiClient.postAPICall(routesApi.updatePointsClaimWithLogin, data ).then(res => res.data);
// export const fetchPointsClaimWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchPointsClaimWithLogin, data ).then(res => res.data);







