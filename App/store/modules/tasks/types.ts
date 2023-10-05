import { ITask } from "@/types";

export interface ITasksState {
  tasks: ITask[];
  error: null | string;
  filterMode: "all" | "onlyInProgress" | "onlyDone";
}
