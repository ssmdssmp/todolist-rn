import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '@/screens';
import {SETTINGS_SCREEN_NAME, TODOLIST_NAVIGATOR_NAME} from '../config';
import TodolistNavigator from './TodolistNavigator';
import {AppStackNavigationProp} from './types';
const AppNavigator = () => {
  const Stack = createStackNavigator<AppStackNavigationProp>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={TODOLIST_NAVIGATOR_NAME}
        component={TodolistNavigator}
      />
      <Stack.Screen name={SETTINGS_SCREEN_NAME} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
