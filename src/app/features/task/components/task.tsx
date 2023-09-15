'use client';

import { FC, useMemo, useRef } from 'react';
import { ButtonCustom } from '@/app/components';
import TagTimeStatus from './tag-time-status';
import { LIST_ACTION, SCHEDULE } from '../task-constant';
import { actions } from '@/app/components/commons/button/button-custom';
import { TaskData } from '../services/types';
import useTaskStore from '../hooks/use-task-store';

type Props = {
  idTask: string;
  typeTask: keyof typeof LIST_ACTION;
  data: TaskData;
  loading?: boolean;
  clickProgress?: () => void;
  clickDone?: () => void;
  clickUpdate?: () => void;
  clickDelete?: () => void;
};

const Task: FC<Props> = ({
  idTask,
  typeTask,
  data,
  clickProgress,
  loading,
  clickDone,
  clickUpdate,
  clickDelete,
}) => {
  const { body } = useTaskStore();

  return (
    <div className="w-[90%] h-[150px] flex justify-between px-3 py-3 rounded-lg mx-auto bg-gray-400 mb-3">
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-lg font-bold">{data.title}</p>
          <p className="text-sm font-medium">{data?.shortDescription}</p>
        </div>
        {data.schedule && (
          <TagTimeStatus
            schedule={data.schedule as keyof typeof SCHEDULE}
            status={data.status}
          />
        )}
      </div>
      <div
        className={`flex flex-col gap-2 justify-${
          typeTask === 'todo' ? 'center' : 'start'
        } items-end`}
      >
        {LIST_ACTION[typeTask].map((action) => (
          <ButtonCustom
            key={action}
            onClick={() => {
              if (action === 'progress') clickProgress!();
              if (action === 'done') clickDone!();
              if (action === 'update') clickUpdate!();
              if (action === 'delete') clickDelete!();
            }}
            action={action as keyof typeof actions}
            className="w-[35px] h-[35px] rounded-full"
            placement="right"
          />
        ))}
      </div>
    </div>
  );
};

export default Task;
