import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "../components/Button";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useLogoutMutation,
  usePutTaskMutation,
  useTodolistsQuery,
} from "../services/hooks";
import { Loader } from "../components/loader";

const Home: NextPage = () => {
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
  const handleChangeStatus = (todolistId: string, task: any) => {
    const newTask = { ...task, status: task.status === 0 ? 2 : 0 };
    putTask({ todolistId, task: newTask });
  };
  const handleDeleteTask = (todolistId: string, taskId: string) => {
    deleteTask({ todolistId, taskId });
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
      <main className={"p-4"}>
        {todolists?.map((todolist) => {
          const tasksForTodolist = tasks?.find((t) => {
            return t?.todolistId === todolist.id;
          })?.data.items;
          return (
            <div
              key={todolist.id}
              className={"mb-4 rounded-md border border-gray-300 p-4"}
            >
              <h2 className={"text-xl"}>{todolist.title}</h2>
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
