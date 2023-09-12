"use client"

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import useTaskStore from "../../hooks/use-task-store"
import { SCHEDULE_OPTION } from "../../task-constant"

type Props = {
  isDisabled: boolean
}

const TaskForm = ({ isDisabled }: Props) => {
  const { setBody, body } = useTaskStore()
  return (
    <>
      <Input
        disabled={isDisabled}
        value={body.title}
        onValueChange={(value) => setBody({ ...body, title: value })}
        required
        name='title'
        label='Title'
      />
      <Select
        disabled={isDisabled}
        value={body.schedule}
        required
        placeholder='Select schedule'
        onChange={(e) => setBody({ ...body, schedule: e.target.value })}
      >
        {SCHEDULE_OPTION.map((schedule) => (
          <SelectItem key={schedule.value} className={`${schedule.style} uppercase`} value={schedule.value}>
            {schedule.label}
          </SelectItem>
        ))}
      </Select>
      <Textarea
        disabled={isDisabled}
        value={body.shortDescription}
        required
        label='Short description'
        labelPlacement='outside'
        placeholder='Enter your short description'
        className='w-full mt-5'
        maxLength={50}
        onValueChange={(value) => setBody({ ...body, shortDescription: value })}
      />
    </>
  )
}

export default TaskForm
