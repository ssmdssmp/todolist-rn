import { ActionTypes } from "./actionTypes";
import { ITask } from "@/types";
import { createAction } from "@reduxjs/toolkit";
import { sliceActions } from "./reducer";

export const tasksActions = {
  ...sliceActions,
  getTasksRequest: createAction<{ uid: string }>(ActionTypes.GET_TASKS_REQUEST),
  CreateNewTaskRequest: createAction<{ uid: string; newTask: ITask }>(
    ActionTypes.CREATE_NEW_TASK_REQUEST
  ),
  deleteTaskRequest: createAction<{ taskId: string; uid: string }>(
    ActionTypes.DELETE_TASK_REQUEST
  ),
  updateTaskStatusRequest: createAction<{
    uid: string;
    taskId: string;
    prevState: boolean;
  }>(ActionTypes.UPDATE_TASK_STATUS_REQUEST),
};
