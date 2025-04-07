import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchCategoryWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchCategoryWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addToCartWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.addToCartWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchFromCartWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchFromCartWithLogin, {});
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

export const fetchDiscountedPriceWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchDiscountedPriceWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteTicketFromCartWithLogin = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.deleteTicketFromCartWithLogin, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// export const addToCartWithLogin = async (data) => await apiClient.postAPICall(routesApi.addToCartWithLogin, data).then(res => res.data);
// export const fetchFromCartWithLogin = async () => await apiClient.postAPICall(routesApi.fetchFromCartWithLogin, {}).then(res => res.data);
// export const deleteItemFromCartWithLogin = async (data) => await apiClient.postAPICall(routesApi.deleteItemFromCartWithLogin, data).then(res => res.data);
// export const fetchDiscountedPriceWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchDiscountedPriceWithLogin, data).then(res => res.data);
// export const deleteTicketFromCartWithLogin = async (data) => await apiClient.postAPICall(routesApi.deleteTicketFromCartWithLogin, data).then(res => res.data);
// export const fetchCategoryWithLogin = async (data) => await apiClient.postAPICall(routesApi.fetchCategoryWithLogin, data).then(res => res.data);
