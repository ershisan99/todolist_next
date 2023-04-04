import { todolistsInstance } from "./todolists.instance";

import { handleError } from "@/helpers";
import type {
  CreateTaskResponse,
  CreateTodolistResponse,
  DeleteTaskResponse,
  DeleteTodolistResponse,
  Task,
  TasksResponse,
  Todolist,
  UpdateTaskResponse,
} from "@/services";

export const TodolistAPI = {
  async getTodolists() {
    const res = await todolistsInstance.get<Todolist[]>("/");

    return res.data;
  },

  async createTodolist({ title }: { title: string }) {
    const res = await todolistsInstance.post<CreateTodolistResponse>("/", {
      title,
    });

    return handleError(res.data);
  },

  async deleteTodolist({ todolistId }: { todolistId: string }) {
    const res = await todolistsInstance.delete<DeleteTodolistResponse>(
      `/${todolistId}`
    );

    return res.data;
  },

  async getTodolistTasks({ todolistId }: { todolistId: string }) {
    const res = await todolistsInstance.get<TasksResponse>(
      `/${todolistId}/tasks`
    );

    return res.data;
  },

  async createTask({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) {
    const res = await todolistsInstance.post<CreateTaskResponse>(
      `/${todolistId}/tasks`,
      { title }
    );

    return handleError(res.data);
  },

  async updateTask({ todolistId, task }: { todolistId: string; task: Task }) {
    const { id, ...rest } = task;
    const res = await todolistsInstance.put<UpdateTaskResponse>(
      `/${todolistId}/tasks/${id}`,
      rest
    );

    return res.data;
  },

  async deleteTask({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) {
    const res = await todolistsInstance.delete<DeleteTaskResponse>(
      `/${todolistId}/tasks/${taskId}`
    );

    return res.data;
  },
};
