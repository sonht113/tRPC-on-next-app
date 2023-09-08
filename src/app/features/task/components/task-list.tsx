"use client"

import { trpc } from "@/utils/trpc"
import { Button } from "@nextui-org/react"

const TaskList = () => {
  const { data } = trpc.task.getTasks.useQuery()
  const { mutate } = trpc.task.createTask.useMutation()

  const handleCreate = () => {
    mutate({ title: "Learn Flutter" })
  }

  console.log(data)
  return (
    <div>
      <Button onClick={handleCreate}>Submit</Button>
    </div>
  )
}

export default TaskList
