import { serverFetch } from "../core/server"

export const getDataByCollection = async <T>(path: string) => {
    const data = await serverFetch<T>(path);
    return data;
};

export const getDataByQueryParams = async <T>(path: string, signal?: AbortSignal) => {
    const data = await serverFetch<T>(path, signal);
    return data;
};

export const getDataByParamsId = async <T> (path: string, id: string, signal?: AbortSignal) => {
    if(!id) return;
    const data = await serverFetch<T>(`${path}/${id}`, signal);
    return data ;
}