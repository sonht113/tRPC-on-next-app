import {
  clearAllTaskDone,
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from '@/server/controllers/task.controller';
import {
  createTaskSchema,
  params,
  updateTaskSchema,
} from '../../schema/task.schema';
import { router, baseProcedure } from '../../trpc';

export const taskRouter = router({
  getTasks: baseProcedure.query(() => getTasksHandler()),
  getTask: baseProcedure
    .input(params)
    .query(({ input }) => getTaskHandler({ paramsInput: input })),
  createTask: baseProcedure
    .input(createTaskSchema)
    .mutation(({ input }) => createTaskHandler({ input })),
  updateTask: baseProcedure
    .input(updateTaskSchema)
    .mutation(({ input }) =>
      updateTaskHandler({ paramsInput: input.params, input: input.body })
    ),
  deleteTask: baseProcedure
    .input(params)
    .mutation(({ input }) => deleteTaskHandler({ paramsInput: input })),
  clearTaskDone: baseProcedure.mutation(() => clearAllTaskDone()),
});
