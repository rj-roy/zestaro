import { statusHandler } from "./statusHandler";

const baseUrl = process.env.SERVER_BASE;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return statusHandler(res);
    // return res.json();
};