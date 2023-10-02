import React, {useEffect, useState} from 'react';
import {
  useAppDispatch,
  useAppSelector,
  userActions,
  getUserSelector,
} from '@/store';
import {checkmarkCircle3d} from '@/assets';
import {LogoImage} from '../styled';
import {
  AuthButton,
  AuthButtonText,
  AuthInput,
  ChangeAuthType,
  ChangeAuthTypeButton,
  ChangeAuthTypeButtonText,
  ChangeAuthTypeText,
  ErrorText,
  ScreenWrapper,
} from '@/components';
import {useNavigation} from '@react-navigation/native';
import {SIGN_UP_SCREEN_NAME} from '@/navigation';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {error} = useAppSelector(getUserSelector);
  const handleChangeAuthTypeButtonPress = () => {
    navigation.navigate(SIGN_UP_SCREEN_NAME);
  };
  const handleSignInButtonPress = () => {
    if (email && password) {
      dispatch(userActions.tryLogin({email: email, password: password}));
    }
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 2000);
    }
  }, [error]);
  const handleGoogleButtonPress = () => {
    dispatch(userActions.tryLoginWithGoogle());
  };
  return (
    <ScreenWrapper>
      <LogoImage source={checkmarkCircle3d} />
      <AuthInput
        onChangeText={e => setEmail(e)}
        value={email}
        placeholder="Email"
      />
      <AuthInput
        onChangeText={e => setPassword(e)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
      <AuthButton onPress={handleSignInButtonPress}>
        <AuthButtonText>Sign In</AuthButtonText>
      </AuthButton>
      <GoogleSigninButton
        style={{
          width: '92%',
          marginTop: 10,
          borderRadius: 20,
          height: 50,
        }}
        size={1}
        onPress={handleGoogleButtonPress}
      />
      <ChangeAuthType>
        <ChangeAuthTypeText>Still don`t have an account?</ChangeAuthTypeText>
        <ChangeAuthTypeButton onPress={handleChangeAuthTypeButtonPress}>
          <ChangeAuthTypeButtonText>Sign up</ChangeAuthTypeButtonText>
        </ChangeAuthTypeButton>
      </ChangeAuthType>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
