import {styled} from 'styled-components/native';

export const CreateTaskTextInput = styled.TextInput`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin-bottom: 8px;
  width: 95%;
  border-radius: 20px;
  height: 50px;
`;
export const CreateTaskButton = styled.Pressable`
  width: 95%;
  margin-top: 5px;
  height: 50px;
  border-radius: 20px;
  background-color: #5aad94;
  justify-content: center;
  align-items: center;
`;
export const CreateTaskButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
export const GoBackButton = styled.Pressable`
  width: 95%;
  height: 50px;
  border-radius: 20px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;
export const GoBackButtonText = styled.Text`
  text-decoration: underline;
`;
export const CreateTaskHeader = styled.Text`
  margin-top: 50%;
  margin-bottom: 20px;
  color: #56a87b;
  font-weight: bold;
`;

export const LogoImage = styled.Image`
  height: 140px;
  margin-bottom: 30px;
  width: 140px;
  margin-top: 20%;
`;
