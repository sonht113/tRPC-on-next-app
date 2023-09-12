import { SCHEDULE } from "../task-constant"

export type TaskData = {
  id: string
  title: string
  shortDescription: string
  status: string
  schedule: string
  createdAt: any
  updatedAt: any
}

export type TaskBody = Pick<TaskData, 'title' | 'shortDescription' | 'schedule'>

export type TaskDataMutaion = Partial<TaskData>
