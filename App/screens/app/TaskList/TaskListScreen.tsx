import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../../store/types';
import {userActions} from '../../../store/modules';

const TaskListScreen = () => {
  const dispatch = useAppDispatch();
  const handlePress = () => {
    dispatch(userActions.signOut());
  };
  return (
    <View>
      <Pressable onPress={handlePress}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default TaskListScreen;
