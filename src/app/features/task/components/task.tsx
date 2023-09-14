'use client';

import { FC } from 'react';
import { ButtonCustom } from '@/app/components';
import TagTimeStatus from './tag-time-status';
import { LIST_ACTION, SCHEDULE } from '../task-constant';
import { actions } from '@/app/components/commons/button/button-custom';
import { TaskData } from '../services/types';

type Props = {
  typeTask: keyof typeof LIST_ACTION;
  data: TaskData;
  loadingProgress?: boolean;
  clickProgress?: () => void;
  clickDone?: () => void;
  clickUpdate?: () => void;
};

const Task: FC<Props> = ({
  typeTask,
  data,
  clickProgress,
  loadingProgress,
  clickDone,
  clickUpdate,
}) => {
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
              if (action === 'progress' && clickProgress) clickProgress();
              if (action === 'done' && clickDone) clickDone();
              if (action === 'update' && clickUpdate) clickUpdate();
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
