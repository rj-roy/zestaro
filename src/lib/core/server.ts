import { ApiResponse } from "@/types/ApiResponse";
import { statusHandler } from "./statusHandler";
import type { HTTPMethod } from "better-auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE!;

export const serverFetch = async <T>(path: string, signal?: AbortSignal): Promise<ApiResponse<T>> => {
  const res = await fetch(`${baseUrl}${path}`);
  return statusHandler<T>(res);
  // return <T>res.json();
};

export const serverMutation = async <T>(
  path: string,
  data: unknown,
  method: HTTPMethod): Promise<ApiResponse<T>> => {

  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return statusHandler<T>(res);
};