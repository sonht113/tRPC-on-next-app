import { boolean, number, object, string, TypeOf } from "zod"

export const createTaskSchema = object({
  title: string({
    required_error: "Title is required"
  })
})

export const params = object({
  taskId: string()
})

export const updateTaskSchema = object({
  params,
  body: object({
    title: string(),
    status: number()
  }).partial()
})

export type CreateTaskInput = TypeOf<typeof createTaskSchema>
export type ParamsInput = TypeOf<typeof params>
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>["body"]
