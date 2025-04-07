import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchMyReferralCode = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyReferralCode, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// export const fetchMyReferralCode = async () => await apiClient.postAPICall(routesApi.fetchMyReferralCode, {} ).then(res => res.data);