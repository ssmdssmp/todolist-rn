import {
  CalendarIcon,
  DeleteTaskWrapper,
  StatusIcon,
  TaskDateWrapper,
  TaskPressable,
  TaskTextWrapper,
  TaskTitleText,
  TaskWrapper,
} from "./styled";
import { calendarIcon, circleIcon, doneCircleIcon, trashIcon } from "@/assets";
import {
  getUserSelector,
  tasksActions,
  useAppDispatch,
  useAppSelector,
} from "@/store";

import { ITask } from "@/types";
import React from "react";
import { SvgXml } from "react-native-svg";
import { Text } from "react-native";
import moment from "moment";

const Task = ({ item }: { item: ITask }) => {
  const formattedCreationTime = moment(new Date(item.creationDate)).calendar();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUserSelector);
  const handleTaskStatusPress = () => {
    if (user && item.id) {
      dispatch(
        tasksActions.updateTaskStatusRequest({
          uid: user.uid,
          taskId: item.id,
          prevState: item.isDone,
        })
      );
    }
  };
  const handleDeletePress = () => {
    if (user && item.id) {
      dispatch(
        tasksActions.deleteTaskRequest({ taskId: item.id, uid: user.uid })
      );
    }
  };

  return (
    <TaskWrapper>
      <TaskPressable onPress={handleTaskStatusPress}>
        <StatusIcon
          xml={!item.isDone ? circleIcon : doneCircleIcon}
          fill={item.isDone ? "#74c79e" : "#fff"}
          height={25}
          width={25}
        />
      </TaskPressable>
      <TaskTextWrapper>
        <TaskDateWrapper>
          <Text>{formattedCreationTime}</Text>
          <CalendarIcon width={12} height={12} xml={calendarIcon} />
        </TaskDateWrapper>
        <TaskTitleText>{item.title}</TaskTitleText>
      </TaskTextWrapper>
      <DeleteTaskWrapper>
        <TaskPressable onPress={handleDeletePress}>
          <SvgXml xml={trashIcon} width={25} height={25} />
        </TaskPressable>
      </DeleteTaskWrapper>
    </TaskWrapper>
  );
};

export default Task;
