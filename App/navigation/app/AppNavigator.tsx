import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../../screens/app/Settings';

import {SETTINGS_SCREEN_NAME, TODOLIST_NAVIGATOR_NAME} from '../config';
import TodolistNavigator from './TodolistNavigator';
const AppNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={TODOLIST_NAVIGATOR_NAME}
        component={TodolistNavigator}
      />
      <Stack.Screen name={SETTINGS_SCREEN_NAME} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
