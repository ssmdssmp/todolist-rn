import React from 'react';
import {
  FilterButton,
  FilterButtonContentWrapper,
  FilterButtonCounterText,
  FilterButtonsWrapper,
  FilterButtonText,
  IconContainer,
} from './styled';
import {SvgXml} from 'react-native-svg';
import {
  clockIcon,
  clockIconInactive,
  doneIcon,
  doneIconInactive,
} from '@/assets';
import {
  useAppDispatch,
  useAppSelector,
  getTasksSelector,
  tasksActions,
} from '@/store';
import {Platform} from 'react-native';

const FilterButtons = () => {
  const {tasks, filterMode} = useAppSelector(getTasksSelector);

  const dispatch = useAppDispatch();

  const handleInProgressFilterPress = () => {
    if (filterMode === 'all') {
      dispatch(tasksActions.setFilterMode('onlyDone'));
    }
    if (filterMode === 'onlyDone') {
      dispatch(tasksActions.setFilterMode('all'));
    }
    if (filterMode === 'onlyInProgress') {
      dispatch(tasksActions.setFilterMode('onlyDone'));
    }
  };
  const handleDoneFilterPress = () => {
    if (filterMode === 'all') {
      dispatch(tasksActions.setFilterMode('onlyInProgress'));
    }
    if (filterMode === 'onlyInProgress') {
      dispatch(tasksActions.setFilterMode('all'));
    }
    if (filterMode === 'onlyDone') {
      dispatch(tasksActions.setFilterMode('onlyInProgress'));
    }
  };

  return (
    <FilterButtonsWrapper>
      <FilterButton
        onPress={handleInProgressFilterPress}
        bgColor={
          filterMode === 'all' || filterMode === 'onlyInProgress'
            ? '#8195db'
            : '#dfe2ed'
        }>
        <FilterButtonContentWrapper>
          <IconContainer>
            <SvgXml
              xml={
                filterMode === 'all' || filterMode === 'onlyInProgress'
                  ? clockIcon
                  : clockIconInactive
              }
              height={25}
              width={25}
            />
          </IconContainer>
          <FilterButtonText>In progress</FilterButtonText>
          <FilterButtonCounterText>
            {tasks.filter(el => el.isDone === false).length}
          </FilterButtonCounterText>
        </FilterButtonContentWrapper>
      </FilterButton>
      <FilterButton
        onPress={handleDoneFilterPress}
        bgColor={
          filterMode === 'all' || filterMode === 'onlyDone'
            ? '#5aad94'
            : '#dfe2ed'
        }>
        <FilterButtonContentWrapper>
          <IconContainer>
            <SvgXml
              xml={
                filterMode === 'all' || filterMode === 'onlyDone'
                  ? doneIcon
                  : doneIconInactive
              }
              height={15}
              width={15}
            />
          </IconContainer>
          <FilterButtonText>Done</FilterButtonText>
          <FilterButtonCounterText>
            {tasks.filter(el => el.isDone !== false).length}
          </FilterButtonCounterText>
        </FilterButtonContentWrapper>
      </FilterButton>
    </FilterButtonsWrapper>
  );
};

export default FilterButtons;
