import {Text} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {circleIcon, doneCircleIcon, calendarIcon, trashIcon} from '@/assets';
import {
  TaskWrapper,
  TaskPressable,
  StatusIcon,
  TaskTextWrapper,
  TaskDateWrapper,
  CalendarIcon,
  TaskTitleText,
  DeleteTaskWrapper,
} from './styled';
import {ITask} from '@/types';
import moment from 'moment';
import {
  useAppDispatch,
  useAppSelector,
  tasksActions,
  getUserSelector,
} from '@/store';

const Task = ({item}: {item: ITask}) => {
  const formattedcreationTime = moment(new Date(item.creationDate)).calendar();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(getUserSelector);
  const handleTaskStatusPress = () => {
    dispatch(
      tasksActions.tryChangeTaskStatus({
        uid: user.uid,
        taskId: item.id,
        prevState: item.isDone,
      }),
    );
  };
  const handleDeletePress = () => {
    dispatch(tasksActions.tryDeleteTask({taskId: item.id, uid: user.uid}));
  };

  return (
    <TaskWrapper>
      <TaskPressable onPress={handleTaskStatusPress}>
        <StatusIcon
          xml={!item.isDone ? circleIcon : doneCircleIcon}
          fill={item.isDone ? '#74c79e' : '#fff'}
          height={25}
          width={25}
        />
      </TaskPressable>
      <TaskTextWrapper>
        <TaskDateWrapper>
          <Text>{formattedcreationTime}</Text>
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
