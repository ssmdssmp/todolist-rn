import React from 'react';
import {AddTaskButtonWrapper} from './styled';
import {SvgXml} from 'react-native-svg';
import {plusIcon} from '@/assets';
import {useNavigation} from '@react-navigation/native';
import {CREATE_TASK_SCREEN_NAME} from '@/navigation';

const AddTaskButton = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(CREATE_TASK_SCREEN_NAME);
  };
  return (
    <AddTaskButtonWrapper onPress={handlePress}>
      <SvgXml xml={plusIcon} width={40} height={40} />
    </AddTaskButtonWrapper>
  );
};

export default AddTaskButton;
