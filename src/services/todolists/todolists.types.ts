import type { ApiResponse } from "@/helpers";

export type UpdateTaskResponseData = {
  item: Task;
};

export type TasksResponse = {
  items: Task[];
  totalCount: number;
  error?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  todoListId: string;
  order: number;
  status: number;
  priority: number;
  startDate?: Date;
  deadline?: Date;
  addedDate: Date;
};

export type Todolist = {
  id: string;
  title: string;
  addedDate: Date;
  order: number;
};

export type PostLoginArgs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponseData = {
  userId: number;
};

export type MeResponseData = {
  id: number;
  login: string;
  email: string;
};

export type LoginResponse = ApiResponse<LoginResponseData>;
export type LogoutResponse = ApiResponse<never>;
export type MeResponse = ApiResponse<MeResponseData>;

export type DeleteTodolistResponse = ApiResponse<never>;
export type CreateTodolistResponse = ApiResponse<CreateTodolistResponseData>;
export type CreateTodolistResponseData = {
  item: Todolist;
};

export type CreateTaskResponse = ApiResponse<{ item: Task }>;
export type DeleteTaskResponse = ApiResponse<never>;
export type UpdateTaskResponse = ApiResponse<UpdateTaskResponseData>;
