import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PostLoginArgs } from "./index";
import { deleteMe, getMe, postLogin } from "./index";
import { useRouter } from "next/router";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (args: PostLoginArgs) => postLogin(args),
  });
};

export const useMeQuery = () => {
  return useQuery({
    queryFn: () => getMe().then((res) => res.data),
    queryKey: ["me"],
    refetchInterval: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    retry: false,
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => deleteMe(),
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      router.push("/login");
    },
  });
};
