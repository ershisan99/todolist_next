import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "../components/Button";
import {
  useCreateTodolistMutation,
  useDeleteTaskMutation,
  useDeleteTodolistMutation,
  useGetTasksQuery,
  useLogoutMutation,
  usePutTaskMutation,
  useTodolistsQuery,
} from "../services/hooks";
import { Loader } from "../components/loader";
import { Input } from "../components/Input";
import type { ChangeEvent } from "react";
import { useState } from "react";

const Home: NextPage = () => {
  const [newTodolistTitle, setNewTodolistTitle] = useState("");
  const { mutate: logout } = useLogoutMutation();
  const { data: todolists, isLoading: isTodolistsLoading } =
    useTodolistsQuery();
  let isLoadingTasks;
  const results = useGetTasksQuery(todolists?.map((t) => t.id) || []);
  const tasks = results.map((r) => {
    if (r.isLoading) isLoadingTasks = true;
    return r?.data;
  });
  const handleLogout = () => {
    logout();
  };
  const { mutate: putTask } = usePutTaskMutation();
  const { mutate: deleteTask } = useDeleteTaskMutation();
  const { mutateAsync: createTodolist } = useCreateTodolistMutation();
  const { mutate: deleteTodolist } = useDeleteTodolistMutation();
  const handleChangeStatus = (todolistId: string, task: any) => {
    const newTask = { ...task, status: task.status === 0 ? 2 : 0 };
    putTask({ todolistId, task: newTask });
  };
  const handleDeleteTask = (todolistId: string, taskId: string) => {
    deleteTask({ todolistId, taskId });
  };
  const handleAddTodolist = () => {
    createTodolist(newTodolistTitle).then((res) => {
      if (res.data.resultCode === 0) setNewTodolistTitle("");
    });
  };

  const handleDeleteTodolist = (todolistId: string) => {
    deleteTodolist(todolistId);
  };

  const handleNewTodolistTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodolistTitle(e.target.value);
  };

  if (isTodolistsLoading || isLoadingTasks)
    return (
      <div className={"flex h-screen items-center justify-center"}>
        <Loader />
      </div>
    );
  return (
    <>
      <Head>
        <title>Todolist</title>
        <meta name="description" content="Incubator todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={"flex justify-between p-4"}>
        <h1 className={"text-3xl"}>Todolist</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main className={"flex flex-col gap-4 p-4"}>
        <div className={"flex items-end gap-2.5"}>
          <label className={"flex w-52 flex-col gap-0.5"}>
            new todolist
            <Input
              value={newTodolistTitle}
              onChange={handleNewTodolistTitleChange}
            />
          </label>
          <Button onClick={handleAddTodolist}>+</Button>
        </div>
        {todolists?.map((todolist) => {
          const tasksForTodolist = tasks?.find((t) => {
            return t?.todolistId === todolist.id;
          })?.data.items;
          return (
            <div
              key={todolist.id}
              className={"rounded-md border border-gray-300 p-4"}
            >
              <div className={"flex items-center justify-between "}>
                <h2 className={"text-xl"}>{todolist.title}</h2>
                <button onClick={() => handleDeleteTodolist(todolist.id)}>
                  x
                </button>
              </div>
              {tasksForTodolist?.map((task: any) => (
                <div className={"flex items-center gap-2"} key={task.id}>
                  <input
                    onChange={() => handleChangeStatus(todolist.id, task)}
                    type={"checkbox"}
                    checked={[0, 1, 3].includes(task.status)}
                  />
                  <div key={task.id}>{task.title}</div>
                  <button
                    onClick={() => handleDeleteTask(todolist.id, task.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Home;
