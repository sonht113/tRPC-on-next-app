import { number, object, string, TypeOf } from "zod"

export const createTaskSchema = object({
  title: string({
    required_error: "Title is required"
  }),
  shortDescription: string({
    required_error: "Short description is required"
  }),
  schedule: string({
    required_error: "Schedule is required"
  })
})

export const params = object({
  taskId: string()
})

export const updateTaskSchema = object({
  params,
  body: object({
    title: string(),
    shortDescription: string(),
    status: number(),
    schedule: string()
  }).partial()
})


export type CreateTaskInput = TypeOf<typeof createTaskSchema>
export type ParamsInput = TypeOf<typeof params>
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>["body"]
