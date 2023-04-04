import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { QUERY_KEYS, ROUTES } from "@/constants";
import { noRefetch } from "@/helpers";
import { AuthApi } from "@/services/auth/auth.api";

export const useMeQuery = () => {
  return useQuery({
    queryFn: AuthApi.me,
    queryKey: [QUERY_KEYS.ME],
    ...noRefetch,
  });
};

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.ME]);
      await router.push(ROUTES.HOME);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.ME]);
      await router.push(ROUTES.LOGIN);
    },
  });
};
