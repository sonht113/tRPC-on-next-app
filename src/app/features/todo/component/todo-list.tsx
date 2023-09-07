"use client"

import { trpc } from "@/utils/trpc"

const TodoList = () => {
  const { data } = trpc.todos.get.useQuery()
  console.log(data)
  return <div className='dark:text-white'>hello</div>
}

export default TodoList
