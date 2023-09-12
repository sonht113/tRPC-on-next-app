"use client"

import { trpc } from "@/utils/trpc"
import Task from "./task"
import TaskListHeader from "./task-list-header"
import { TASK_LIST_HEADER } from "../task-constant"
import { FC } from "react"
import { Spinner, useDisclosure } from "@nextui-org/react"
import { serverClient } from "@/utils/serverClient"
import useTaskStore from "../hooks/use-task-store"
import toast from "react-hot-toast"

type Props = {
  initialTasks?: Awaited<ReturnType<typeof serverClient.task.getTasks>>
  typeTask: keyof typeof TASK_LIST_HEADER
}

const initialBody = {
  title: "",
  shortDescription: "",
  schedule: ""
}

const TaskList: FC<Props> = ({ typeTask, initialTasks }) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { data, isLoading, refetch } = trpc.task.getTasks.useQuery(undefined, {
    initialData: initialTasks,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
  const { body, setBody } = useTaskStore()
  const { mutate, isLoading: addLoading } = trpc.task.createTask.useMutation()

  const handleCreate = () => {
    mutate(body, {
      onSuccess: () => {
        toast.success("Add task successfully")
        refetch()
        setBody(initialBody)
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  }

  return (
    <section className='w-[350px] pb-5 bg-white rounded-lg dark:text-black'>
      <TaskListHeader
        typeTask={typeTask}
        submit={handleCreate}
        isLoading={addLoading}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      {isLoading && (
        <div className='flex justify-center'>
          <Spinner color={typeTask === "todo" ? "secondary" : typeTask === "progress" ? "warning" : "success"} />
        </div>
      )}
      <section className='h-[500px] overflow-y-auto'>
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
    </section>
  )
}

export default TaskList
