"use client"

import { Button, ButtonProps, Tooltip, TooltipProps } from "@nextui-org/react"
import { FC, ReactNode } from "react"
import { AddIcon, ClearIcon, DeleteIcon, DoneIcon, InProgressIcon, UpdateIcon } from "../../icons"

type Props =  TooltipProps & {
  className?: string
  action: keyof typeof actions
  onClick?: () => void
}

export const actions = {
  add: {
    color: "bg-[#10B670]",
    text: "Add new task",
    icon: <AddIcon className='stroke-white' />
  },
  update: {
    color: "bg-[#21ABA5]",
    text: "Update task",
    icon: <UpdateIcon className="w-[20px]" />
  },
  delete: {
    color: "bg-[#C21367]",
    text: "Delete task",
    icon: <DeleteIcon className="w-[20px]" />
  },
  clear: {
    color: "bg-[#9753EF]",
    text: "Clear all task done",
    icon: <ClearIcon className='w-[25px] fill-white stroke-black' />
  },
  done: {
    color: "bg-[#00B288]",
    text: "Done task",
    icon: <DoneIcon className="w-[20px]" />
  },
  progress: {
    color: "bg-[#FFB423]",
    text: "Do task",
    icon: <InProgressIcon className="w-[20px]" />
  }
}

const ButtonCustom: FC<Props> = ({ action, className, onClick, ...props }) => {
  return (
    <Tooltip content={actions[action].text} {...props}>
      <button
        type='button'
        onClick={onClick}
        className={`
        ${actions[action].color} 
        w-[40px] 
        h-[40px] 
        flex
        justify-center 
        items-center 
        cursor-pointer 
        ${className} 
        hover:scale-105 
        transition-all 
        duration-150`}
      >
        {actions[action].icon}
      </button>
    </Tooltip>
  )
}

export default ButtonCustom
