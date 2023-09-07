import { Prisma, Task } from "@prisma/client"
import { prisma } from "../utils/prisma"

export const createTask = async (input: Prisma.TaskCreateInput) => {
  return (await prisma.task.create({
    data: input
  })) as Task
}

export const findTask = async (where: Partial<Prisma.TaskWhereInput>, select?: Prisma.TaskSelect) => {
  return (await prisma.task.findFirst({
    where,
    select
  })) as Task
}

export const findUniqueTask = async (where: Prisma.TaskWhereUniqueInput, select?: Prisma.TaskSelect) => {
  return (await prisma.task.findUnique({
    where,
    select
  })) as Task
}

export const findAllTask = async () => {
  const tasks = (await prisma.task.findMany()) as Task[]

  return {
    todoTasks: tasks.filter((task) => task.status === "1"),
    inProgressTasks: tasks.filter((task) => task.status === "2"),
    doneTasks: tasks.filter((task) => task.status === "3")
  }
}

export const updatePost = async (
  where: Prisma.TaskWhereUniqueInput,
  data: Prisma.TaskUpdateInput,
  select?: Prisma.TaskSelect
) => {
  return (await prisma.task.update({ where, data, select })) as Task
}

export const deletePost = async (where: Prisma.TaskWhereUniqueInput) => {
  return await prisma.task.delete({ where })
}
