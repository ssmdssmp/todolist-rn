import {
  GoBackButton,
  GoBackButtonText,
  LogoutButton,
  LogoutButtonText,
  ProfileIcon,
  ProfileText,
} from "./styled";
import {
  getUserSelector,
  useAppDispatch,
  useAppSelector,
  userActions,
} from "@/store";

import React from "react";
import { ScreenWrapper } from "@/components";
import { TODOLIST_NAVIGATOR_NAME } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { userIcon } from "@/assets";

const SettingsScreen = () => {
  const { user } = useAppSelector(getUserSelector);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const handleGoBackButtonPress = () => {
    navigation.navigate(TODOLIST_NAVIGATOR_NAME);
  };
  const handleLogoutButtonPress = () => {
    dispatch(userActions.logoutRequest());
  };
  return (
    <ScreenWrapper>
      <ProfileIcon xml={userIcon} height={50} width={50} />
      <ProfileText>{user?.email}</ProfileText>
      <LogoutButton onPress={handleLogoutButtonPress}>
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
      <GoBackButton onPress={handleGoBackButtonPress}>
        <GoBackButtonText>Go Back</GoBackButtonText>
      </GoBackButton>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
