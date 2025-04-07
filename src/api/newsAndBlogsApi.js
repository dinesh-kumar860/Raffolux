import * as apiClient from './httpCommon';
import { routesApi } from "../helpers/routesApi";

export const fetchNewsAndBlogs = async () => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchNewsAndBlogs, {});
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchNews = async (data) => {
    try {
        const routes = await routesApi();
        const result = await apiClient.postAPICall(routes.fetchNews, data);
        return result.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// export const fetchNewsAndBlogs = async () => await apiClient.postAPICall(routesApi.fetchNewsAndBlogs, {}).then(res => res.data);
// export const fetchNews = async (data) => await apiClient.postAPICall(routesApi.fetchNews, data).then(res => res.data);
