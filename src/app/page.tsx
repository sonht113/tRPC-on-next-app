"use client"
import TaskList from "./features/task/components/task-list"

export default function Home() {
  return (
    <main className='w-full px-20'>
      <div className='max-w-[1024px] max-h-[715px] w-full h-[715px] bg-[#9353d3] dark:bg-[#E1CA9E] mt-5 mx-auto rounded-lg'>
        <p className='text-3xl font-bold text-center text-white dark:text-[#9353d3] pt-2'>Task</p>
        <div className='w-[90%] flex justify-center items-start gap-5 mx-auto mt-6'>
          <TaskList typeTask="todo" />
          <TaskList typeTask="progress" />
          <TaskList typeTask="done" />
        </div>
      </div>
    </main>
  )
}
