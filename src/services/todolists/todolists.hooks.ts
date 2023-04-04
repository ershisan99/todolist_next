import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants";
import { noRefetch } from "@/helpers";
import { TodolistAPI } from "@/services";

export const useTodolistsQuery = () => {
  return useQuery({
    queryFn: TodolistAPI.getTodolists,
    queryKey: [QUERY_KEYS.TODOLISTS],
    ...noRefetch,
  });
};

export const useCreateTodolistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodolistAPI.createTodolist,
    //todo: add onMutate
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.TODOLISTS]);
    },
  });
};

export const useDeleteTodolistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodolistAPI.deleteTodolist,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOLISTS]);
    },
  });
};

export const useGetTasksQuery = (todolistId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS, todolistId],
    queryFn: () => TodolistAPI.getTodolistTasks({ todolistId }),
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodolistAPI.createTask,
    onSuccess: (res) => {
      const todolistId = res.data.item.todoListId;

      queryClient.invalidateQueries([QUERY_KEYS.TASKS, todolistId]);
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodolistAPI.updateTask,
    onSuccess: async (res) => {
      const todolistId = res.data.item.todoListId;

      await queryClient.invalidateQueries([QUERY_KEYS.TASKS, todolistId]);
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodolistAPI.deleteTask,
    onSuccess: (_, variables) => {
      const todolistId = variables.todolistId;

      queryClient.invalidateQueries([QUERY_KEYS.TASKS, todolistId]);
    },
  });
};
