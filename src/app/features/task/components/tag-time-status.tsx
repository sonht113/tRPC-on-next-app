"use client"

import { FC } from "react"
import { SCHEDULE } from "../task-constant"
import { EnumTaskStatus } from "../services/enums"
import { hasItemInList } from "@/utils/common"

type Props = {
  status: string
  schedule: keyof typeof SCHEDULE
}

const TagTimeStatus: FC<Props> = ({ status, schedule }) => {
  return (
    <div className='flex justify-start items-center gap-3'>
      <div className={`w-[40px] h-[40px] rounded-lg ${SCHEDULE[schedule].style} flex justify-center items-center`}>
        <p className='text-sm font-semibold text-white capitalize'>{SCHEDULE[schedule].label}</p>
      </div>
      <div className='flex justify-start items-center gap-2'>
        <div className={`w-[20px] h-[10px] ${SCHEDULE[schedule].style} rounded-[2px] rounded-bl-[20px]`}></div>
        <div
          className={`w-[20px] h-[10px] ${
            hasItemInList(+status, [EnumTaskStatus["DONE"], EnumTaskStatus["IN_PROGRESS"]])
              ? SCHEDULE[schedule].style
              : "bg-gray-300"
          } rounded-[2px] rounded-bl-[20px]`}
        ></div>
        <div
          className={`w-[20px] h-[10px] ${
            +status === EnumTaskStatus["DONE"] ? SCHEDULE[schedule].style : "bg-gray-300"
          } rounded-[2px] rounded-bl-[20px]`}
        ></div>
      </div>
    </div>
  )
}

export default TagTimeStatus
