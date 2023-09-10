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

export type TaskDataMutaion = Partial<TaskData>
