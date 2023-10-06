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
import React, { useEffect, useState } from "react";
import {
  getUserSelector,
  useAppDispatch,
  useAppSelector,
  userActions,
} from "@/store";

import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { LogoImage } from "../styled";
import { SIGN_IN_SCREEN_NAME } from "@/navigation";
import auth from "@react-native-firebase/auth";
import { checkmarkCircle3d } from "@/assets";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const { authError } = useAppSelector(getUserSelector);

  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleChangeAuthTypeButtonPress = () => {
    navigation.navigate(SIGN_IN_SCREEN_NAME);
  };
  useEffect(() => {
    dispatch(userActions.clearError());
  }, []);
  useEffect(() => {
    console.log(authError);
  }, [authError]);
  const handleSignUpButtonPress = () => {
    if (email && password) {
      dispatch(
        userActions.RegisterRequest({ email: email, password: password })
      );
    }
  };
  const handleGoogleButtonPress = () => {
    dispatch(
      userActions.LoginRequest({
        authType: "google",
      })
    );
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
      <AuthButton onPress={handleSignUpButtonPress}>
        <AuthButtonText>Sign Up</AuthButtonText>
      </AuthButton>
      <GoogleSigninButton
        style={{
          width: "92%",
          marginTop: 10,
          borderRadius: 20,
          height: 50,
        }}
        size={1}
        onPress={handleGoogleButtonPress}
      />
      <ChangeAuthType>
        <ChangeAuthTypeText>Already have an account?</ChangeAuthTypeText>
        <ChangeAuthTypeButton onPress={handleChangeAuthTypeButtonPress}>
          <ChangeAuthTypeButtonText>Login</ChangeAuthTypeButtonText>
        </ChangeAuthTypeButton>
      </ChangeAuthType>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
