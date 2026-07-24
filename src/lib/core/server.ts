import { ApiResponse } from "@/types/ApiResponse";
import { statusHandler } from "./statusHandler";

const baseUrl = process.env.SERVER_BASE!;

export const serverFetch = async <T>(path: string): Promise<ApiResponse<T>> => {
  const res = await fetch(`${baseUrl}${path}`);
  return statusHandler<T>(res);
  // return <T>res.json();
};