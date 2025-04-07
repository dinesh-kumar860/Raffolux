import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const signIn = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.signIn, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const socialSignInGoogle = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.socialSignInGoogle, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const socialSignInFacebook = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.socialSignInFacebook, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const generateOtpSmsVerificationWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.generateOtpSmsVerificationWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// export const signIn = async (data) => await apiClient.postAPICall(routesApi().signIn, data).then(res => res.data);
// export const generateOtpSmsVerificationWithLogin = async () => await apiClient.postAPICall(routesApi().generateOtpSmsVerificationWithLogin, {} ).then(res => res.data);
// export const socialSignInGoogle = async () => await apiClient.postAPICall(routesApi().socialSignInGoogle, {} ).then(res => res.data);
// export const socialSignInFacebook = async () => await apiClient.postAPICall(routesApi().socialSignInFacebook, {} ).then(res => res.data);
