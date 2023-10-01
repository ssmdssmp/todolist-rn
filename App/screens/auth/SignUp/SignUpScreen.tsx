import {View, Text, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch} from '../../../store/types';
import {userActions} from '../../../store/modules';

const SignUpScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      userActions.tryRegister({
        email: 'test2002334@gmail.com',
        password: '123123123',
      }),
    );
  }, []);
  return (
    <View>
      <Text>SignUpScreen</Text>
    </View>
  );
};

export default SignUpScreen;
