import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchMyPrizeClaimsWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyPrizeClaimsWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// export const  fetchMyPrizeClaimsWithLogin = async () => await apiClient.postAPICall(routesApi.fetchMyPrizeClaimsWithLogin, {}).then(res => res.data);