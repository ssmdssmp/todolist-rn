import { ITask } from "@/types";
import { tasksActions } from "./actions";
export interface ITasksState {
  tasks: ITask[];
  error: null | string;
  filterMode: "all" | "onlyInProgress" | "onlyDone";
}

export type TTaskWorker = {
  payload: Parameters<typeof tasksActions.getTasksRequest>[0];
  type: typeof tasksActions.getTasksRequest.type;
};

export type TCreateNewTaskWorker = {
  payload: Parameters<typeof tasksActions.CreateNewTaskRequest>[0];
  type: typeof tasksActions.CreateNewTaskRequest.type;
};

export type TChangeTaskStatusWorker = {
  payload: Parameters<typeof tasksActions.updateTaskStatusRequest>[0];
  type: typeof tasksActions.updateTaskStatusRequest.type;
};

export type TDeleteTaskWorker = {
  payload: Parameters<typeof tasksActions.deleteTaskRequest>[0];
  type: typeof tasksActions.deleteTaskRequest.type;
};
