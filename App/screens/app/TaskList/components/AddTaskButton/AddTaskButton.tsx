import { AddTaskButtonWrapper } from "./styled";
import { CREATE_TASK_SCREEN_NAME } from "@/navigation";
import React from "react";
import { SvgXml } from "react-native-svg";
import { plusIcon } from "@/assets";
import { useNavigation } from "@react-navigation/native";

const AddTaskButton = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(CREATE_TASK_SCREEN_NAME);
  };
  return (
    <AddTaskButtonWrapper onPress={handlePress}>
      <SvgXml xml={plusIcon} width={40} height={40} />
    </AddTaskButtonWrapper>
  );
};

export default AddTaskButton;
