import React, { useEffect } from "react";
import {
  getTasksSelector,
  getUserSelector,
  tasksActions,
  useAppDispatch,
  useAppSelector,
} from "@/store";

import { ITask } from "@/types";
import { Task } from "./components";
import { TasksFlatList } from "./components";

const TaskList = () => {
  const { tasks, filterMode } = useAppSelector(getTasksSelector);
  const { user } = useAppSelector(getUserSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(tasksActions.getTasksRequest({ uid: user.uid }));
      dispatch(tasksActions.setFilterMode("all"));
    }
  }, []);
  const renderItem = ({ item }: { item: ITask }) => {
    return <Task item={item} />;
  };
  return (
    <TasksFlatList
      data={
        filterMode === "all"
          ? tasks
          : filterMode === "onlyInProgress"
          ? tasks.filter((el) => el.isDone === false).filter((el) => el.id)
          : tasks.filter((el) => el.isDone === true)
      }
      renderItem={renderItem}
    />
  );
};

export default TaskList;
