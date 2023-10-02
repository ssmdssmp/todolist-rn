import {createStackNavigator} from '@react-navigation/stack';
import {CreateTaskScreen, TaskListScreen} from '@/screens';
import {CREATE_TASK_SCREEN_NAME, TASKLIST_SCREEN_NAME} from '../config';
const TodolistNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={TASKLIST_SCREEN_NAME} component={TaskListScreen} />
      <Stack.Screen
        name={CREATE_TASK_SCREEN_NAME}
        component={CreateTaskScreen}
      />
    </Stack.Navigator>
  );
};

export default TodolistNavigator;
