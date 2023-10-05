import { TPayload } from "./../../types";
import { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { ITasksState } from "./types";

const initialState: ITasksState = {
  tasks: [],
  error: null,
  filterMode: "all",
};
export const tasksReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setTasks: (state, { payload }: TPayload<ITask[]>) => {
      if (payload.length > 1) {
        state.tasks = payload.sort((a, b) => {
          const DateA: number = Number(new Date(a.creationDate));
          const DateB: number = Number(new Date(b.creationDate));
          return DateB - DateA;
        });
      } else {
        state.tasks = payload;
      }
    },
    createNewTask: (state, { payload }: TPayload<ITask>) => {
      state.tasks = [payload, ...state.tasks];
    },
    deleteTask: (state, { payload }: TPayload<string>) => {
      state.tasks = state.tasks.filter((el) => el.id !== payload);
    },
    updateTaskStatus: (state, { payload }: TPayload<string>) => {
      const taskToUpdate = state.tasks.find((el) => el.id === payload);
      if (taskToUpdate) {
        taskToUpdate.isDone = !taskToUpdate.isDone;
      }
    },
    setFilterMode: (
      state,
      { payload }: TPayload<typeof initialState.filterMode>
    ) => {
      state.filterMode = payload;
    },
    resetTask: (state) => {
      state.tasks = [];
    },
    setError: (state, { payload }: TPayload<string>) => {
      state.error = payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});
export const sliceActions = tasksReducer.actions;
export default tasksReducer.reducer;
