import React, { useEffect } from "react";

import { ScreenWrapper } from "@/components";

import {
  AddTaskButton,
  FilterButtons,
  TaskList,
  TaskListHeader,
} from "./components";
import { tasksActions, useAppDispatch } from "@/store";

const TaskListScreen = () => {
  const dispatch = useAppDispatch();

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
