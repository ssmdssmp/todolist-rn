import {ITask} from '@/types';
import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  tasks: ITask[];
  error: null | string;
  filterMode: 'all' | 'onlyInProgress' | 'onlyDone';
} = {
  tasks: [],
  error: null,
  filterMode: 'all',
};
export const tasksReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    tryGetTasks: ({payload}: {payload: {uid: string}}) => {},
    getTasksSuccess: (state, {payload}: {payload: ITask[]}) => {
      state.tasks = payload;
      if (payload.length > 1) {
        state.tasks = payload.sort((a, b) => {
          const DateA = new Date(a.creationDate);
          const DateB = new Date(b.creationDate);
          return DateB - DateA;
        });
      } else {
        state.tasks = payload;
      }

      state.error = null;
    },
    getTasksFailure: (state, {payload}: {payload: string}) => {
      if (state.tasks.length === 0) {
        state.tasks = [];
      }
      state.error = payload;
    },
    tryCreateNewTask: ({
      payload,
    }: {
      payload: {uid: string; newTask: ITask};
    }) => {},
    createNewTaskSuccess: (state, {payload}: {payload: ITask}) => {
      state.tasks = [payload, ...state.tasks];

      state.error = null;
    },
    createNewTaskFailure: (
      state,
      {payload}: {payload: {error: string; newTask: ITask}},
    ) => {
      state.error = payload.error;
      state.tasks = [payload.newTask, ...state.tasks];
    },
    tryDeleteTask: ({payload}: {payload: {taskId: string; uid: string}}) => {},
    deleteTaskSuccess: (state, {payload}: {payload: string}) => {
      state.tasks = state.tasks.filter(el => el.id !== payload);
    },
    deleteTaskFailure: (
      state,
      {payload}: {payload: {error: string; id: string}},
    ) => {
      state.tasks = state.tasks.filter(el => el.id !== payload.id);

      state.error = payload.error;
    },
    setTasks: (state, {payload}: {payload: ITask[]}) => {
      state.tasks = payload;
    },
    resetTasks: state => {
      state.tasks = [];
    },
    clearError: state => {
      state.error = null;
    },
    tryChangeTaskStatus: ({
      payload,
    }: {
      payload: {uid: string; taskId: string; prevState: boolean};
    }) => {},
    changeTaskStatusSuccess: (state, {payload}) => {
      state.tasks.find(el => el.id === payload).isDone = !state.tasks.find(
        el => el.id === payload,
      ).isDone;
    },
    changeTaskStatusFailure: (state, {payload}) => {
      state.tasks.find(el => el.id === payload).isDone = !state.tasks.find(
        el => el.id === payload.id,
      ).isDone;

      state.error = payload.error;
    },
    sortTasks: state => {
      state.tasks = state.tasks.sort((a, b) => {
        const DateA = new Date(a.creationDate);
        const DateB = new Date(b.creationDate);
        return DateA - DateB;
      });
    },
    setFilterMode: (
      state,
      {payload}: {payload: 'all' | 'onlyInProgress' | 'onlyDone'},
    ) => {
      state.filterMode = payload;
    },
  },
});
export const tasksActions = tasksReducer.actions;
export default tasksReducer.reducer;
