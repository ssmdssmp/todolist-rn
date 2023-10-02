import React, {useEffect, useRef} from 'react';
import {TasksFlatList} from './components';
import {
  getTasksSelector,
  useAppDispatch,
  useAppSelector,
  getUserSelector,
  tasksActions,
} from '@/store';
import {ITask} from '@/types';
import {Task} from './components';

const TaskList = () => {
  const {tasks, filterMode} = useAppSelector(getTasksSelector);
  const tasksRef = useRef(null);
  tasksRef.current = tasks;
  const {user} = useAppSelector(getUserSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksActions.tryGetTasks({uid: user.uid}));
    dispatch(tasksActions.setFilterMode('all'));
  }, []);
  const renderItem = ({item}: {item: ITask}) => {
    return <Task item={item} />;
  };
  return (
    <TasksFlatList
      data={
        filterMode === 'all'
          ? tasks
          : filterMode === 'onlyInProgress'
          ? tasks.filter(el => el.isDone === false).filter(el => el.id)
          : tasks.filter(el => el.isDone === true)
      }
      renderItem={renderItem}
    />
  );
};

export default TaskList;
