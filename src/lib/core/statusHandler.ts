import { ApiResponse } from "@/types/ApiResponse";
import { redirect } from "next/navigation";

export const statusHandler = async <T>(
  res: Response
): Promise<ApiResponse<T>> => {
  if (res.status === 401) redirect("/unauthorized");
  if (res.status === 403) redirect("/forbidden");
  if (res.status === 404) redirect("/not-found");

  const result = (await res.json()) as ApiResponse<T>;

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
};