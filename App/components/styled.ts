import {TScreenWrapper} from './types';
import styled from 'styled-components/native';
export const ScreenWrapper = styled.SafeAreaView<TScreenWrapper>`
  align-items: ${({alignItems}) => (alignItems ? alignItems : ' center')};
  justify-content: ${({justifyContent}) =>
    justifyContent ? justifyContent : 'flex-start'};
  width: 100%;
  height: 100%;
`;
export const AuthInput = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: 3px 0px;
  padding: 0px 20px;
`;
export const AuthButton = styled.Pressable`
  width: 90%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #74c79e;
  margin-top: 5px;
  border-radius: 20px;
  elevation: 2;
`;
export const ChangeAuthType = styled.View`
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
`;
export const AuthButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 15px;
`;
export const ChangeAuthTypeText = styled.Text`
  font-size: 13px;
`;
export const ChangeAuthTypeButton = styled.Pressable`
  margin-left: 5px;
`;
export const ChangeAuthTypeButtonText = styled.Text`
  color: #56a87b;
  font-weight: bold;
`;
export const ErrorText = styled.Text`
  color: red;
  margin: 5px 0px;
  text-align: center;
`;
