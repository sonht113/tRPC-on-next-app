import { create } from 'zustand';
import { TaskBody } from '../services/types';

type TaskStore = {
  body: TaskBody;
  setBody: (body: TaskBody) => void;
};

const useTaskStore = create<TaskStore>((set) => ({
  body: {
    title: '',
    shortDescription: '',
    schedule: '',
    id: '',
    status: '1',
  },
  setBody: (body: TaskBody) => {
    set({ body });
  },
}));

export default useTaskStore;
