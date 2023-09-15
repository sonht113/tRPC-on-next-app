import { TRPCError } from '@trpc/server';
import {
  clearTasksDone,
  createTask,
  deleteTask,
  findAllTask,
  findUniqueTask,
  updateTask,
} from '../services/task.service';
import {
  CreateTaskInput,
  ParamsInput,
  UpdateTaskInput,
} from './../schema/task.schema';

/**
 *
 * @param input: {title: string}
 * @returns {status: string, data: {task}}
 */
export const createTaskHandler = async ({
  input,
}: {
  input: CreateTaskInput;
}) => {
  try {
    const taskFound = await findUniqueTask({ title: input.title });
    if (taskFound) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Task with that title already exists',
      });
    }
    const task = await createTask({
      title: input.title,
      shortDescription: input.shortDescription,
      schedule: input.schedule,
    });

    return {
      status: 'success',
      data: {
        task,
      },
    };
  } catch (err: any) {
    if (err.code === 'P2002') {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Task with that title already exists',
      });
    }
    throw err;
  }
};

/**
 *
 * @param paramsInput: {idTask: string}
 * @returns {status: string, data: {task}}
 */
export const getTaskHandler = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const task = await findUniqueTask({ id: paramsInput.taskId });

    if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Task with that ID not found',
      });
    }

    return {
      status: 'success',
      data: {
        task,
      },
    };
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @returns {status: string, data: {task[]}}
 */
export const getTasksHandler = async () => {
  try {
    const tasks = await findAllTask();
    return {
      status: 'success',
      data: {
        tasks,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};

/**
 *
 * @param {paramInput: {idTask: string}, input: {title: string, status: string | number}}
 * @returns {status: string, data: {task}}
 */
export const updateTaskHandler = async ({
  paramsInput,
  input,
}: {
  paramsInput: ParamsInput;
  input: UpdateTaskInput;
}) => {
  try {
    const task = await updateTask(
      { id: paramsInput.taskId },
      { ...input, status: String(input.status) }
    );

    if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Task with that ID not found',
      });
    }
    return {
      status: 'success',
      data: {
        task,
      },
    };
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param paramsInput: {idTask}
 * @returns {status: string, data: {task}}
 */
export const deleteTaskHandler = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const task = await deleteTask({ id: paramsInput.taskId });
    if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Task with ID not found',
      });
    }
    return {
      status: 'success',
      data: {
        task,
      },
    };
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @returns {status: boolean}
 */
export const clearAllTaskDone = async () => {
  try {
    await clearTasksDone();

    return { status: 'success' };
  } catch (err) {
    throw err;
  }
};
