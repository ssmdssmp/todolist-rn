import React from 'react';
import {SvgXml} from 'react-native-svg';
import {wavingHand, userIcon} from '@/assets';
import {
  GreetingsWrapper,
  GreetingsTextWrapper,
  GreetingsTextName,
  GreetingsTextAction,
  GreetingsImage,
  TaskListHeaderWrapper,
  ProfilePressable,
} from './styled';
import {useAppSelector, getUserSelector} from '@/store';
import {useNavigation} from '@react-navigation/native';
import {SETTINGS_SCREEN_NAME} from '@/navigation';

const TaskListHeader = () => {
  const {user} = useAppSelector(getUserSelector);
  const navigation = useNavigation();
  const handleProfileButtonPress = () => {
    navigation.navigate(SETTINGS_SCREEN_NAME);
  };
  return (
    <TaskListHeaderWrapper>
      <GreetingsWrapper>
        <GreetingsTextWrapper>
          <GreetingsTextName>
            Hello{' '}
            {user.displayName
              ? user.displayName
              : user.email.slice(0, user.email.indexOf('@'))}
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
