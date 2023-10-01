import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../store/types';
import {getUserSelector} from '../store/modules/user/selector';
import {AppNavigator} from './app';
import {AuthNavigator} from './auth';
import {useEffect} from 'react';
import {Platform} from 'react-native';
const RootNavigator = () => {
  const {user} = useAppSelector(getUserSelector);
  useEffect(() => {
    if (Platform.OS === 'android') {
      console.log(112, user);
    }
  }, [user]);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default RootNavigator;
