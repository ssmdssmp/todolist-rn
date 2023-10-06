import {
  FilterButton,
  FilterButtonContentWrapper,
  FilterButtonCounterText,
  FilterButtonText,
  FilterButtonsWrapper,
  IconContainer,
} from "./styled";
import {
  clockIcon,
  clockIconInactive,
  doneIcon,
  doneIconInactive,
} from "@/assets";
import {
  getTasksSelector,
  tasksActions,
  useAppDispatch,
  useAppSelector,
} from "@/store";

import React from "react";
import { SvgXml } from "react-native-svg";

const FilterButtons = () => {
  const { tasks, filterMode } = useAppSelector(getTasksSelector);

  const dispatch = useAppDispatch();

  const handleInProgressFilterPress = () => {
    if (filterMode === "all" || filterMode === "onlyInProgress") {
      dispatch(tasksActions.setFilterMode("onlyDone"));
    } else {
      dispatch(tasksActions.setFilterMode("all"));
    }
  };
  const handleDoneFilterPress = () => {
    if (filterMode === "all" || filterMode === "onlyDone") {
      dispatch(tasksActions.setFilterMode("onlyInProgress"));
    } else {
      dispatch(tasksActions.setFilterMode("all"));
    }
  };

  return (
    <FilterButtonsWrapper>
      <FilterButton
        onPress={handleInProgressFilterPress}
        bgColor={
          filterMode === "all" || filterMode === "onlyInProgress"
            ? "#8195db"
            : "#dfe2ed"
        }
      >
        <FilterButtonContentWrapper>
          <IconContainer>
            <SvgXml
              xml={
                filterMode === "all" || filterMode === "onlyInProgress"
                  ? clockIcon
                  : clockIconInactive
              }
              height={25}
              width={25}
            />
          </IconContainer>
          <FilterButtonText>In progress</FilterButtonText>
          <FilterButtonCounterText>
            {tasks.filter((el) => el.isDone === false).length}
          </FilterButtonCounterText>
        </FilterButtonContentWrapper>
      </FilterButton>
      <FilterButton
        onPress={handleDoneFilterPress}
        bgColor={
          filterMode === "all" || filterMode === "onlyDone"
            ? "#5aad94"
            : "#dfe2ed"
        }
      >
        <FilterButtonContentWrapper>
          <IconContainer>
            <SvgXml
              xml={
                filterMode === "all" || filterMode === "onlyDone"
                  ? doneIcon
                  : doneIconInactive
              }
              height={15}
              width={15}
            />
          </IconContainer>
          <FilterButtonText>Done</FilterButtonText>
          <FilterButtonCounterText>
            {tasks.filter((el) => el.isDone !== false).length}
          </FilterButtonCounterText>
        </FilterButtonContentWrapper>
      </FilterButton>
    </FilterButtonsWrapper>
  );
};

export default FilterButtons;
