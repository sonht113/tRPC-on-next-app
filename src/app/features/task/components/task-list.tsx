"use client"

import { trpc } from "@/utils/trpc"
import Task from "./task"
import TaskListHeader from "./task-list-header"
import { TASK_LIST_HEADER } from "../task-constant"
import { FC } from "react"
import { Spinner } from "@nextui-org/react"

type Props = {
  typeTask: keyof typeof TASK_LIST_HEADER
}

const TaskList: FC<Props> = ({ typeTask }) => {
  const { data, isLoading, refetch } = trpc.task.getTasks.useQuery()
  const { mutate } = trpc.task.createTask.useMutation()

  const handleCreate = () => {
    mutate(
      {
        title: "Learn Reactjs",
        schedule: "tuesday",
        shortDescription: "Learn react18 tutorial"
      },
      {
        onSuccess: () => {
          refetch()
        }
      }
    )
  }

  return (
    <section className='w-[350px] pb-5 bg-white rounded-lg dark:text-black'>
      <TaskListHeader typeTask={typeTask} />
      {isLoading && (
        <div className='flex justify-center'>
          <Spinner color={typeTask === "todo" ? "secondary" : typeTask === "progress" ? "warning" : "success"} />
        </div>
      )}
      <section className="h-[450px] overflow-y-auto">
        {data &&
          typeTask === "todo" &&
          data.data.tasks.todoTasks.map((task) => <Task key={task.id} typeTask={typeTask} data={task} />)}
        {data &&
          typeTask === "progress" &&
          data.data.tasks.inProgressTasks.map((task) => <Task key={task.id} typeTask={typeTask} data={task} />)}
        {data &&
          typeTask === "done" &&
          data.data.tasks.doneTasks.map((task) => <Task key={task.id} typeTask={typeTask} data={task} />)}
      </section>
      <button onClick={handleCreate}>submit</button>
    </section>
  )
}

export default TaskList
