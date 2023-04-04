import { handleError } from "@/helpers";
import { authInstance } from "@/services/auth/auth.instance";
import type {
  LoginResponse,
  LogoutResponse,
  MeResponse,
  PostLoginArgs,
} from "@/services/todolists";

export const AuthApi = {
  async login(args: PostLoginArgs) {
    const res = await authInstance.post<LoginResponse>("/login", args);

    return handleError(res.data);
  },

  async logout() {
    const res = await authInstance.delete<LogoutResponse>("/login");

    return handleError(res.data);
  },

  async me() {
    const res = await authInstance.get<MeResponse>("/me");

    return handleError(res.data);
  },
};
