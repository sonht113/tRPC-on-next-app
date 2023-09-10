"use client"

import { FC } from "react"
import { TASK_LIST_HEADER } from "../task-constant"

type Props = {
  typeTask: keyof typeof TASK_LIST_HEADER
}

const TaskListHeader: FC<Props> = ({ typeTask }) => {
  return (
    <div className='flex justify-between items-center px-3 py-5'>
      <section className='w-[70%] flex items-center justify-start gap-2'>
        <div
          className={`w-[40px] h-[40px] ${TASK_LIST_HEADER[typeTask].color} flex justify-center items-center rounded-full`}
        >
          {TASK_LIST_HEADER[typeTask].icon}
        </div>
        <span className={`font-bold text-xl ${TASK_LIST_HEADER[typeTask].textColor}`}>
          {TASK_LIST_HEADER[typeTask].label}
        </span>
      </section>
      {TASK_LIST_HEADER[typeTask].action}
    </div>
  )
}

export default TaskListHeader
