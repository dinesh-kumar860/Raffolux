import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchMyPrizeClaimsCountWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyPrizeClaimsCountWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchPaypalDetailsWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchPaypalDetailsWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchBankDetailsWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchBankDetailsWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deletePaypalDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.deletePaypalDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteBankDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.deleteBankDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addBankDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.addBankDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateBankDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.updateBankDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addPaypalDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.addPaypalDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updatePaypalDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.updatePaypalDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const claimMyPrizesWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.claimMyPrizesWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const claimMethodChangeWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.claimMethodChangeWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// export const fetchPaypalDetailsWithLogin = async () => await apiClient.postAPICall(routesApi.fetchPaypalDetailsWithLogin, {}).then(res => res.data);
// export const fetchBankDetailsWithLogin = async () => await apiClient.postAPICall(routesApi.fetchBankDetailsWithLogin, {}).then(res => res.data);
// export const deletePaypalDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.deletePaypalDetailsWithLogin, data).then(res => res.data);
// export const deleteBankDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.deleteBankDetailsWithLogin, data).then(res => res.data);
// export const addBankDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.addBankDetailsWithLogin, data).then(res => res.data);
// export const updateBankDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.updateBankDetailsWithLogin, data).then(res => res.data);
// export const addPaypalDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.addPaypalDetailsWithLogin, data).then(res => res.data);
// export const updatePaypalDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.updatePaypalDetailsWithLogin, data).then(res => res.data);
// export const claimMyPrizesWithLogin = async (data) => await apiClient.postAPICall(routesApi.claimMyPrizesWithLogin, data).then(res => res.data);
// export const fetchMyPrizeClaimsCountWithLogin = async () => await apiClient.postAPICall(routesApi.fetchMyPrizeClaimsCountWithLogin,{} ).then(res => res.data);



