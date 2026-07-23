import { serverFetch } from "../core/server"

export const getDataByCollection = async <T>(path: string) => {
    const data = serverFetch<T>(path);
    return data;
};

export const getDataByQueryParams = async <T>(path: string) => {
    const data = serverFetch<T>(path);
    return data;
};