import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchWinnersGalleryWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchWinnersGalleryWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// export const fetchWinnersGalleryWithLogin = async () => await apiClient.postAPICall(routesApi.fetchWinnersGalleryWithLogin, {}).then(res => res.data);
