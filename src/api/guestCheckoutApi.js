import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const guestCheckout = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.guestCheckout, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchGuestCartOnPayment = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchGuestCartOnPayment, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const guestAccountCreation = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.guestAccountCreation, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};




