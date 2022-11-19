import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { PostLoginArgs } from "./index";
import {
  deleteMe,
  deleteTask,
  getMe,
  getTask,
  getTodolists,
  postLogin,
  putTask,
} from "./index";
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

export const useTodolistsQuery = () => {
  return useQuery({
    queryFn: () => getTodolists().then((res) => res.data),
    queryKey: ["todolists"],
    refetchInterval: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    retry: false,
  });
};

export const useGetTasksQuery = (todolistIds: string[]) => {
  const enabled = todolistIds && todolistIds.length > 0;
  return useQueries({
    queries: todolistIds.map((todolistId) => {
      return {
        queryKey: ["tasks", todolistId],
        queryFn: () =>
          getTask(todolistId).then((res) => {
            return {
              data: res.data,
              todolistId,
            };
          }),
        enabled: enabled,
      };
    }),
  });
};

export const usePutTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: any) => putTask(args.todolistId, args.task),
    onSuccess: (res) => {
      const todolistId = res.data.data.item.todoListId;
      queryClient.invalidateQueries(["tasks", todolistId]);
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: any) => deleteTask(args.todolistId, args.taskId),
    onSuccess: (_, variables) => {
      const todolistId = variables.todolistId;
      queryClient.invalidateQueries(["tasks", todolistId]);
    },
  });
};
