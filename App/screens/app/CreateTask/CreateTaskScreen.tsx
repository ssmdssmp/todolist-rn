import React, {useState} from 'react';
import {ScreenWrapper} from '@/components';
import {
  CreateTaskButton,
  CreateTaskButtonText,
  CreateTaskHeader,
  CreateTaskTextInput,
  GoBackButton,
  GoBackButtonText,
} from './styled';
import {useNavigation} from '@react-navigation/native';
import {TASKLIST_SCREEN_NAME} from '@/navigation';
import {
  useAppDispatch,
  useAppSelector,
  tasksActions,
  getTasksSelector,
  getUserSelector,
} from '@/store';
import {ITask} from '@/types';

const CreateTaskScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const {tasks} = useAppSelector(getTasksSelector);
  const {user} = useAppSelector(getUserSelector);
  const handleBackButtonPress = () => {
    navigation.navigate(TASKLIST_SCREEN_NAME);
  };
  const handleCreateTaskButtonPress = () => {
    const newTask: ITask = {
      title: taskTitle,
      creationDate: new Date().toString(),
      isDone: false,
    };
    dispatch(tasksActions.tryCreateNewTask({uid: user.uid, newTask}));
    navigation.navigate(TASKLIST_SCREEN_NAME);
  };
  return (
    <ScreenWrapper>
      <CreateTaskHeader>Create New Task</CreateTaskHeader>
      <CreateTaskTextInput
        value={taskTitle}
        onChangeText={e => setTaskTitle(e)}
        placeholder="Title"
      />

      <CreateTaskButton onPress={handleCreateTaskButtonPress}>
        <CreateTaskButtonText>Create Task</CreateTaskButtonText>
      </CreateTaskButton>
      <GoBackButton onPress={handleBackButtonPress}>
        <GoBackButtonText>Go Back</GoBackButtonText>
      </GoBackButton>
    </ScreenWrapper>
  );
};

export default CreateTaskScreen;
