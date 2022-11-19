import { instance } from "./instance";

const handleError = (data: any) => {
  if (data.resultCode === 0) {
    return data;
  } else {
    throw new Error(data.messages[0]);
  }
};

export type PostLoginArgs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const postLogin = async (args: PostLoginArgs) => {
  const data = await instance.post("auth/login", args);
  return handleError(data.data);
};

export const getMe = async () => {
  const data = await instance.get("auth/me");
  return handleError(data.data);
};

export const deleteMe = async () => {
  const data = await instance.delete("auth/login");
  return handleError(data.data);
};
