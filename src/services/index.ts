import { instance } from "./instance";

const handleError = (data: any) => {
  if (data.resultCode === 0) {
    return data;
  } else {
    throw new Error(data.messages[0]);
  }
};

export interface Todolist {
  id: string;
  title: string;
  addedDate: Date;
  order: number;
}
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

export const getTodolists = () => {
  return instance.get<Todolist[]>("todo-lists");
};

export const getTask = (todolistId: string) => {
  return instance.get(`todo-lists/${todolistId}/tasks`);
};

export const putTask = (todolistId: string, task: any) => {
  const { id, ...rest } = task;
  return instance.put(`todo-lists/${todolistId}/tasks/${id}`, rest);
};
export const deleteTask = (todolistId: string, taskId: string) => {
  return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`);
};
