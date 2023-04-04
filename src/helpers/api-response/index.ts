import type { ResultCode } from "@/constants";

type ApiResponseSuccess<T> = {
  data: T;
  messages?: never;
  fieldsErrors?: never;
  resultCode: ResultCode.Success;
};

type ApiResponseError<T> = {
  data: T;
  messages: string[];
  fieldsErrors?: string[];
  resultCode: ResultCode.InvalidRequest | ResultCode.InvalidRequestWithCaptcha;
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError<T>;
