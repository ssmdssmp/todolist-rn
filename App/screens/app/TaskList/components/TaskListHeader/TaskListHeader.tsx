import {
  GreetingsImage,
  GreetingsTextAction,
  GreetingsTextName,
  GreetingsTextWrapper,
  GreetingsWrapper,
  ProfilePressable,
  TaskListHeaderWrapper,
} from "./styled";
import { getUserSelector, useAppSelector } from "@/store";
import { userIcon, wavingHand } from "@/assets";

import React from "react";
import { SETTINGS_SCREEN_NAME } from "@/navigation";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const TaskListHeader = () => {
  const { user } = useAppSelector(getUserSelector);
  const navigation = useNavigation();
  const handleProfileButtonPress = () => {
    navigation.navigate(SETTINGS_SCREEN_NAME);
  };
  return (
    <TaskListHeaderWrapper>
      <GreetingsWrapper>
        <GreetingsTextWrapper>
          <GreetingsTextName>
            Hello{" "}
            {user
              ? user.displayName
                ? user.displayName
                : user.email.slice(0, user.email.indexOf("@"))
              : null}
            ,
          </GreetingsTextName>
          <GreetingsTextAction>You have work to do</GreetingsTextAction>
        </GreetingsTextWrapper>
        <GreetingsImage source={wavingHand} />
      </GreetingsWrapper>
      <ProfilePressable onPress={handleProfileButtonPress}>
        <SvgXml xml={userIcon} height={30} width={30} />
      </ProfilePressable>
    </TaskListHeaderWrapper>
  );
};

export default TaskListHeader;
