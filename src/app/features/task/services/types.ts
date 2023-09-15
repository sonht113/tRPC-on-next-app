import { SCHEDULE } from '../task-constant';

export type TaskData = {
  id: string;
  title: string;
  shortDescription: string;
  status: string;
  schedule: string;
  createdAt: any;
  updatedAt: any;
};

export type TaskBody = Partial<
  Pick<TaskData, 'title' | 'shortDescription' | 'schedule' | 'id' | 'status'>
>;

export type TaskDataMutaion = Partial<Omit<TaskData, 'status'>> & {
  status?: number;
};
