import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

export const TasksFlatList = styled.FlatList`
  width: 100%;
  margin-top: 15px;
  padding: 0px 15px;
`;

export const TaskWrapper = styled.View`
  width: 100%;
  margin: 3px 0px;
  border-radius: 20px;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  background-color: #dfe2ed;
`;
export const TaskPressable = styled.Pressable`
  width: 35px;
  height: 35px;
  background-color: #fff;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;
export const StatusIcon = styled(SvgXml)`
  width: 25px;
  height: 25px;
`;
export const TaskTextWrapper = styled.View`
  margin-left: 15px;
`;

export const TaskDateWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`;

export const CalendarIcon = styled(SvgXml)`
  height: 20px;
  margin-left: 5px;
  width: 20px;
`;

export const TaskTitleText = styled.Text`
  font-size: 16px;
`;

export const DeleteTaskWrapper = styled.View`
  position: absolute;
  right: 10px;
  top: 18px;
`;
