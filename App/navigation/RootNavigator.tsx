import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '@/store';
import {getUserSelector} from '../store/modules/user/selector';
import {AppNavigator} from './app';
import {AuthNavigator} from './auth';

const RootNavigator = () => {
  const {user} = useAppSelector(getUserSelector);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default RootNavigator;
