import type { ApiResponse } from "@/services";

export const handleError = <T>(data: ApiResponse<T>): ApiResponse<T> => {
  if (data.resultCode !== 0) {
    const error = data?.messages?.[0] || "An error has occurred";

    throw new Error(error);
  }

  return data;
};
