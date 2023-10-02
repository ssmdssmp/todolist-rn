import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen, SignUpScreen} from '@/screens';

import {SIGN_IN_SCREEN_NAME, SIGN_UP_SCREEN_NAME} from '../config';
const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SIGN_UP_SCREEN_NAME} component={SignUpScreen} />
      <Stack.Screen name={SIGN_IN_SCREEN_NAME} component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
