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
} from "@/components";
import { LogoImage, StyledGoogleSignInButton } from "../styled";
import React, { useState } from "react";
import {
  getUserSelector,
  useAppDispatch,
  useAppSelector,
  userActions,
} from "@/store";

import { SIGN_UP_SCREEN_NAME } from "@/navigation";
import { checkmarkCircle3d } from "@/assets";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authError } = useAppSelector(getUserSelector);
  const handleChangeAuthTypeButtonPress = () => {
    navigation.navigate(SIGN_UP_SCREEN_NAME);
  };
  const handleSignInButtonPress = () => {
    if (email && password) {
      dispatch(
        userActions.LoginRequest({
          email: email,
          password: password,
          authType: "firebase",
        })
      );
    }
  };

  const handleGoogleButtonPress = () => {
    dispatch(userActions.LoginRequest({ authType: "google" }));
  };
  return (
    <ScreenWrapper>
      <LogoImage source={checkmarkCircle3d} />
      <AuthInput
        onChangeText={(e) => setEmail(e)}
        value={email}
        placeholder="Email"
      />
      <AuthInput
        onChangeText={(e) => setPassword(e)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      {authError ? <ErrorText>{authError}</ErrorText> : null}
      <AuthButton onPress={handleSignInButtonPress}>
        <AuthButtonText>Sign In</AuthButtonText>
      </AuthButton>
      <StyledGoogleSignInButton size={1} onPress={handleGoogleButtonPress} />
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
