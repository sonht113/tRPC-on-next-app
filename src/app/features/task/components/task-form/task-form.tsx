'use client';

import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import useTaskStore from '../../hooks/use-task-store';
import { SCHEDULE_OPTION } from '../../task-constant';

type Props = {
  isDisabled: boolean;
};

const TaskForm = ({ isDisabled }: Props) => {
  const { setBody, body } = useTaskStore();

  return (
    <>
      <Input
        disabled={isDisabled}
        value={body.title}
        onValueChange={(value) => setBody({ ...body, title: value })}
        required
        name="title"
        label="Title"
      />
      <Select
        disabled={isDisabled}
        defaultSelectedKeys={[body.schedule || '']}
        required
        placeholder="Select schedule"
        onChange={(e) => setBody({ ...body, schedule: e.target.value })}
        renderValue={(items) => {
          if (!items.length) return <span>Select schedule</span>;
          return (
            <span
              className={`uppercase ${items[0].props?.className} w-full flex text-black px-2 py-3 rounded-xl`}
            >
              {items[0].props?.value}
            </span>
          );
        }}
      >
        {SCHEDULE_OPTION.map((schedule) => (
          <SelectItem
            key={schedule.value}
            className={`${schedule.style} uppercase`}
            value={schedule.value}
          >
            {schedule.value}
          </SelectItem>
        ))}
      </Select>
      <Textarea
        disabled={isDisabled}
        value={body.shortDescription}
        required
        label="Short description"
        labelPlacement="outside"
        placeholder="Enter your short description"
        className="w-full mt-5"
        maxLength={50}
        onValueChange={(value) => setBody({ ...body, shortDescription: value })}
      />
    </>
  );
};

export default TaskForm;
