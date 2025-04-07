import { routesApi } from '../helpers/routesApi';
import * as apiClient from './httpCommon';


export const fetchAllRafflesWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchAllRafflesWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchFeaturedRafflesWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchFeaturedRafflesWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchSuperFeaturedRaffleWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchSuperFeaturedRaffleWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchPrizesWon = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchPrizesWon, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchRaffleWinners = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchRaffleWinners, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchRaffleWinnersThisWeek = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchRaffleWinnersThisWeek, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchRaisedCharity = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchRaisedCharity, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchSoldOutRafflesWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchSoldOutRafflesWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const fetchMyPrizeCashClaimsWithLogin = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchMyPrizeCashClaimsWithLogin, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


// export const fetchAllRafflesWithLogin = async () => await apiClient.postAPICall(routesApi().fetchAllRafflesWithLogin, {}).then(res => res.data);
// export const fetchFeaturedRafflesWithLogin = async () => await apiClient.postAPICall(routesApi().fetchFeaturedRafflesWithLogin, {}).then(res => res.data);
// export const _fetchStatistics = async () => await apiClient.postAPICall(routesApi().fetchStatistics, {}).then(res => res.data);
// export const fetchPrizesWon = async () => await apiClient.postAPICall(routesApi().fetchPrizesWon, {}).then(res => res.data);
// export const fetchRaffleWinners = async () => await apiClient.postAPICall(routesApi().fetchRaffleWinners, {}).then(res => res.data);
// export const fetchRaffleWinnersThisWeek = async () => await apiClient.postAPICall(routesApi().fetchRaffleWinnersThisWeek, {}).then(res => res.data);
// export const fetchRaisedCharity = async () => await apiClient.postAPICall(routesApi().fetchRaisedCharity, {}).then(res => res.data);
// export const fetchSoldOutRafflesWithLogin = async () => await apiClient.postAPICall(routesApi().fetchSoldOutRafflesWithLogin, {}).then(res => res.data);
// export const fetchSuperFeaturedRaffleWithLogin = async () => await apiClient.postAPICall(routesApi().fetchSuperFeaturedRaffleWithLogin, {}).then(res => res.data);