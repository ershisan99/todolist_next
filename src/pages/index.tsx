import type { ChangeEvent } from "react";
import { useState } from "react";

import { type NextPage } from "next";
import Head from "next/head";

import { Todolist, Button, FullscreenLoader, Input } from "@/components";
import {
  useCreateTodolistMutation,
  useLogoutMutation,
  useTodolistsQuery,
} from "@/services";

const Home: NextPage = () => {
  const [newTodolistTitle, setNewTodolistTitle] = useState("");
  const { mutate: logout } = useLogoutMutation();
  const { data: todolists, isLoading: isTodolistsLoading } =
    useTodolistsQuery();

  const handleLogout = () => {
    logout();
  };

  const { mutate: createTodolist } = useCreateTodolistMutation();

  const handleAddTodolist = () => {
    createTodolist({ title: newTodolistTitle });
    setNewTodolistTitle("");
  };

  const handleNewTodolistTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodolistTitle(e.target.value);
  };

  if (isTodolistsLoading) return <FullscreenLoader />;

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
