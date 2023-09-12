import { ButtonCustom } from "../../components"
import { ClearIcon, DoneIcon, InProgressIcon, TodoIcon } from "../../components/icons"

export const TASK_LIST_HEADER = {
  todo: {
    label: "To-Do",
    color: "bg-[#6C12DE]",
    textColor: "text-[#6C12DE]",
    icon: <TodoIcon className='w-[20px] stroke-white' />,
    action: (callback?: () => void) => <ButtonCustom onClick={callback} action='add' className='rounded-full' />
  },
  progress: {
    label: "In-Progress",
    color: "bg-[#D3AF00]",
    textColor: "text-[#D3AF00]",
    icon: <InProgressIcon className='w-[20px] stroke-white' />,
    action: (callback?: () => void) => null
  },
  done: {
    label: "Done",
    color: "bg-[#00B288]",
    textColor: "text-[#00B288]",
    icon: <DoneIcon className='w-[30px] fill-white stroke-black' />,
    action: (callback: () => void) => <ButtonCustom onClick={callback} action='clear' className='rounded-full' />
  }
}

export const SCHEDULE = {
  monday: {
    style: "bg-[#21ABA5]",
    label: "mon",
    value: "monday"
  },
  tuesday: {
    style: "bg-[#FFB423]",
    label: "tus",
    value: "tuesday"
  },
  wednesday: {
    style: "bg-[#005792]",
    label: "wed",
    value: "wednesday"
  },
  thursday: {
    style: "bg-[#6807F9]",
    label: "thu",
    value: "thursday"
  },
  friday: {
    style: "bg-[#CB213E]",
    label: "fri",
    value: "friday"
  }
}

export const SCHEDULE_OPTION = Object.values(SCHEDULE)

export const LIST_ACTION = {
  todo: ["progress", "update", "delete"],
  progress: ["done"],
  done: ["delete"]
}
