import type { ChangeEvent, FC, MouseEventHandler } from "react";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useDeleteTodolistMutation,
  useGetTasksQuery,
  usePutTaskMutation,
} from "../services/hooks";
import { memo, useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

type Props = {
  todolist: any;
};

type Filter = "all" | "active" | "completed";

const Todolist: FC<Props> = ({ todolist }) => {
  const { data: tasks, isLoading } = useGetTasksQuery(todolist.id);
  const { mutate: putTask } = usePutTaskMutation();
  const { mutate: deleteTask } = useDeleteTaskMutation();
  const { mutate: deleteTodolist } = useDeleteTodolistMutation();
  const { mutateAsync: createTask } = useCreateTaskMutation();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  console.log(newTaskTitle);
  const handleChangeStatus = (todolistId: string, task: any) => {
    const newTask = { ...task, status: task.status === 0 ? 2 : 0 };
    putTask({ todolistId, task: newTask });
  };
  const handleDeleteTask = (todolistId: string, taskId: string) => {
    deleteTask({ todolistId, taskId });
  };
  const handleDeleteTodolist = (todolistId: string) => {
    deleteTodolist(todolistId);
  };
  const handleAddTask = () => {
    createTask({ todolistId: todolist.id, title: newTaskTitle }).then((res) => {
      if (res.data.resultCode === 0) setNewTaskTitle("");
    });
  };
  const handleNewTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const handleFilterChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    setFilter(e.currentTarget.value as Filter);
  };

  if (isLoading) return <div>loading...</div>;
  const filteredTasks = tasks?.data?.items?.filter((task: any) => {
    switch (filter) {
      case "active":
        return task.status === 0;
      case "completed":
        return task.status === 2;
      default:
        return true;
    }
  });
  return (
    <div
      key={todolist.id}
      className={
        "w- flex w-72 flex-col gap-3 rounded-md border border-gray-300 p-4"
      }
    >
      <div className={"flex items-center justify-between "}>
        <h2 className={"text-xl"}>{todolist.title}</h2>
        <button onClick={() => handleDeleteTodolist(todolist.id)}>x</button>
      </div>
      <div className={"flex w-52 gap-4"}>
        <Input value={newTaskTitle} onChange={handleNewTaskTitleChange} />
        <Button onClick={handleAddTask}>+</Button>
      </div>
      {filteredTasks.map((task: any) => (
        <div className={"flex items-center gap-2"} key={task.id}>
          <input
            onChange={() => handleChangeStatus(todolist.id, task)}
            type={"checkbox"}
            checked={[0, 1, 3].includes(task.status)}
          />
          <div key={task.id}>{task.title}</div>
          <button onClick={() => handleDeleteTask(todolist.id, task.id)}>
            X
          </button>
        </div>
      ))}
      <div className={"flex"}>
        <Button onClick={handleFilterChange} value={"all"}>
          All
        </Button>
        <Button onClick={handleFilterChange} value={"active"}>
          Active
        </Button>
        <Button onClick={handleFilterChange} value={"completed"}>
          Completed
        </Button>
      </div>
    </div>
  );
};

export default memo(Todolist);
