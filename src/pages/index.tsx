import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "../components/Button";
import {
  useCreateTodolistMutation,
  useLogoutMutation,
  useTodolistsQuery,
} from "../services/hooks";
import { Loader } from "../components/loader";
import { Input } from "../components/Input";
import type { ChangeEvent } from "react";
import { useState } from "react";
import Todolist from "../components/todolist";

const Home: NextPage = () => {
  const [newTodolistTitle, setNewTodolistTitle] = useState("");
  const { mutate: logout } = useLogoutMutation();
  const { data: todolists, isLoading: isTodolistsLoading } =
    useTodolistsQuery();

  const handleLogout = () => {
    logout();
  };

  const { mutateAsync: createTodolist } = useCreateTodolistMutation();

  const handleAddTodolist = () => {
    createTodolist(newTodolistTitle).then((res) => {
      if (res.data.resultCode === 0) setNewTodolistTitle("");
    });
  };

  const handleNewTodolistTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodolistTitle(e.target.value);
  };

  if (isTodolistsLoading)
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
        <div className={"flex flex-wrap gap-4"}>
          {todolists?.map((todolist) => {
            return <Todolist todolist={todolist} key={todolist.id} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
