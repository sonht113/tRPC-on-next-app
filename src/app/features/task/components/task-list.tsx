'use client';

import { trpc } from '@/utils/trpc';
import Task from './task';
import TaskListHeader from './task-list-header';
import { TASK_LIST_HEADER } from '../task-constant';
import { FC, useState } from 'react';
import { Spinner, useDisclosure } from '@nextui-org/react';
import { serverClient } from '@/utils/serverClient';
import useTaskStore from '../hooks/use-task-store';
import toast, { Renderable, Toast, ValueFunction } from 'react-hot-toast';
import { TaskDataMutaion } from '../services/types';
import { EnumTaskStatus } from '../services/enums';

type Props = {
  initialTasks?: Awaited<ReturnType<typeof serverClient.task.getTasks>>;
  typeTask: keyof typeof TASK_LIST_HEADER;
};

const initialBody = {
  title: '',
  shortDescription: '',
  schedule: '',
  id: '',
  status: '1',
};

const NOTIFI_UPDATE = 'Update task successfully';
const NOTIFI_TODO = 'Todo task successfully';
const NOTIFI_DONE = 'Done task successfully';

const TaskList: FC<Props> = ({ typeTask, initialTasks }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { data, isLoading, refetch } = trpc.task.getTasks.useQuery(undefined, {
    initialData: initialTasks,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const { body, setBody } = useTaskStore();
  const { mutate, isLoading: addLoading } = trpc.task.createTask.useMutation();
  const { mutate: updateTask, isLoading: updateLoading } =
    trpc.task.updateTask.useMutation();
  const { mutate: deleteTask, isLoading: deleteLoading } =
    trpc.task.deleteTask.useMutation();
  const { mutate: clearTask, isLoading: clearLoading } =
    trpc.task.clearTaskDone.useMutation();

  const handleCreate = () => {
    mutate(
      {
        title: body.title || '',
        schedule: body.schedule || '',
        shortDescription: body.shortDescription || '',
      },
      {
        onSuccess: () => {
          toast.success('Add task successfully');
          refetch();
          setBody(initialBody);
          onClose();
        },
        onError: (err: {
          message: Renderable | ValueFunction<Renderable, Toast>;
        }) => {
          toast.error(err.message);
        },
      }
    );
  };

  const handleUpdate = (id: string, body: TaskDataMutaion, notifi: string) => {
    updateTask(
      { params: { taskId: id }, body: body },
      {
        onSuccess: () => {
          toast.success(notifi);
          refetch();
          setBody(initialBody);
          onClose();
        },
        onError: (err) => {
          toast.success(err.message);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteTask(
      {
        taskId: id,
      },
      {
        onSuccess: () => {
          toast.success('Delete task successfully');
          refetch();
          setBody(initialBody)
        },
        onError: () => {
          toast.error('Delete task faild, something went error');
        },
      }
    );
  };

  const handleClearTaskDone = () => {
    clearTask(undefined, {
      onSuccess: () => {
        toast.success('Clear tasks successfully');
        refetch();
      },
      onError: () => {
        toast.error('Clear tasks faild, something went error');
      },
    });
  };

  const handleSubmit = () => {
    body.id
      ? handleUpdate(
          body.id,
          {
            title: body.title,
            shortDescription: body.shortDescription,
            schedule: body.schedule,
            status: body.status ? +body.status : 1,
          },
          NOTIFI_UPDATE
        )
      : handleCreate();
  };

  return (
    <section className="w-[350px] pb-5 bg-white rounded-lg dark:text-black">
      <TaskListHeader
        typeTask={typeTask}
        submit={handleSubmit}
        clearTaskFn={handleClearTaskDone}
        isLoading={addLoading || updateLoading}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      {isLoading && (
        <div className="flex justify-center">
          <Spinner
            color={
              typeTask === 'todo'
                ? 'secondary'
                : typeTask === 'progress'
                ? 'warning'
                : 'success'
            }
          />
        </div>
      )}
      <section className="h-[500px] overflow-y-auto">
        {data &&
          typeTask === 'todo' &&
          data.data.tasks.todoTasks.map((task) => (
            <Task
              clickProgress={() => {
                setBody({ id: task.id });
                handleUpdate(
                  task.id,
                  { status: EnumTaskStatus['IN_PROGRESS'] },
                  NOTIFI_TODO
                );
              }}
              clickUpdate={() => {
                setBody({
                  title: task.title,
                  shortDescription: task.shortDescription,
                  schedule: task.schedule,
                  id: task.id,
                  status: task.status,
                });
                onOpen();
              }}
              clickDelete={() => {
                setBody({id: task.id})
                handleDelete(task.id)
              }}
              loading={updateLoading || deleteLoading}
              key={task.id}
              idTask={task.id}
              typeTask={typeTask}
              data={task}
            />
          ))}
        {data &&
          typeTask === 'progress' &&
          data.data.tasks.inProgressTasks.map((task) => (
            <Task
              clickDone={() =>
                handleUpdate(
                  task.id,
                  { status: EnumTaskStatus['DONE'] },
                  NOTIFI_DONE
                )
              }
              idTask={task.id}
              key={task.id}
              typeTask={typeTask}
              data={task}
            />
          ))}
        {data &&
          typeTask === 'done' &&
          data.data.tasks.doneTasks.map((task) => (
            <Task
              key={task.id}
              idTask={task.id}
              clickDelete={() => handleDelete(task.id)}
              typeTask={typeTask}
              data={task}
            />
          ))}
      </section>
    </section>
  );
};

export default TaskList;
