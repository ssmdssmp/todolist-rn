import {
  AddTaskButton,
  FilterButtons,
  TaskList,
  TaskListHeader,
} from "./components";

import React from "react";
import { ScreenWrapper } from "@/components";

const TaskListScreen = () => {
  return (
    <ScreenWrapper>
      <TaskListHeader />
      <FilterButtons />
      <TaskList />
      <AddTaskButton />
    </ScreenWrapper>
  );
};

export default TaskListScreen;
