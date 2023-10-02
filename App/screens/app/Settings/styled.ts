import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

export const ProfileText = styled.Text`
  margin-top: 15px;
`;
export const ProfileIcon = styled(SvgXml)`
  margin-top: 40%;
`;

export const LogoutButton = styled.Pressable`
  width: 95%;
  height: 50px;
  background-color: #8195db;
  border-radius: 20px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;
export const LogoutButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;
export const GoBackButton = styled.Pressable`
  margin-top: 10px;
`;
export const GoBackButtonText = styled.Text`
  text-decoration: underline;
`;
