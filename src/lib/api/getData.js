import { serverFetch } from "../core/server"

export const getDataByCollection = async (path) => {
    const data = serverFetch(path);
    return data;
};

export const getDataByQueryParams = async (path) => {
    const data = serverFetch(path);
    return data;
};