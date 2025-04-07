import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchAccountWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchAccountWithLogin, {});
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

export const addAddressDetailsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.addAddressDetailsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const changePasswordWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.changePasswordWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateAccountWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.updateAccountWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const generateOtpSmsVerificationForAccountWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.generateOtpSmsVerificationForAccountWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateServiceOptsWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.updateServiceOptsWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const verifySmsOtpForAccountWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.verifySmsOtpForAccountWithLogin, data);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const generateOtpSmsVerificationWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.generateOtpSmsVerificationWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// export const displayAddressWithLogin = async () => await apiClient.postAPICall(routesApi.displayAddressWithLogin, {}).then(res => res.data);
// export const addAddressDetailsWithLogin = async (data) => await apiClient.postAPICall(routesApi.addAddressDetailsWithLogin, data).then(res => res.data);
// export const changePasswordWithLogin = async (data) => await apiClient.postAPICall(routesApi.changePasswordWithLogin, data).then(res => res.data);
// export const fetchAccountWithLogin = async () => await apiClient.postAPICall(routesApi.fetchAccountWithLogin, {}).then(res => res.data);
// export const updateAccountWithLogin = async (data) => await apiClient.postAPICall(routesApi.updateAccountWithLogin, data).then(res => res.data);
// export const generateOtpSmsVerificationForAccountWithLogin = async () => await apiClient.postAPICall(routesApi.generateOtpSmsVerificationForAccountWithLogin, {}).then(res => res.data);
// export const updateServiceOptsWithLogin = async (data) => await apiClient.postAPICall(routesApi.updateServiceOptsWithLogin, data).then(res => res.data);
// export const verifySmsOtpForAccountWithLogin = async (data) => await apiClient.postAPICall(routesApi.verifySmsOtpForAccountWithLogin, data).then(res => res);
// export const generateOtpSmsVerificationWithLogin = async () => await apiClient.postAPICall(routesApi.generateOtpSmsVerificationWithLogin, {}).then(res => res.data);
