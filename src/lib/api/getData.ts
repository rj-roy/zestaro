import { serverFetch } from "../core/server"

export const getDataByCollection = async (path: string) => {
    const data = serverFetch(path);
    return data;
};

export const getDataByQueryParams = async (path: string) => {
    const data = serverFetch(path);
    return data;
};