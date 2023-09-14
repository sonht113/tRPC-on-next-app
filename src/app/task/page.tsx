import { serverClient } from "@/utils/serverClient"
import { TaskList } from "../features/task"

export default async function Task() {
  const task = await serverClient.task.getTasks()

  return (
    <main className='w-full px-20'>
      <div className='max-w-[1024px] max-h-[715px] w-full h-[715px] bg-[#9353d3] dark:bg-[#E1CA9E] mt-5 mx-auto rounded-lg'>
        <p className='text-3xl font-bold text-center text-white dark:text-[#9353d3] pt-2'>Task</p>
        <div className='w-[90%] flex justify-center items-start gap-5 mx-auto mt-6'>
          <TaskList typeTask='todo' initialTasks={task} />
          <TaskList typeTask='progress' initialTasks={task} />
          <TaskList typeTask='done' initialTasks={task} />
        </div>
      </div>
    </main>
  )
}
