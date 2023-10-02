import {styled} from 'styled-components/native';
import {TFilterButton} from './types';

export const FilterButtonsWrapper = styled.View`
  height: 80px;
  margin-top: 15px;
  width: 100%;
  padding: 0px 15px;
  flex-direction: row;
  justify-content: space-between;
`;

export const FilterButton = styled.Pressable<TFilterButton>`
  width: 49%;
  height: 100%;
  background-color: ${({bgColor}) => bgColor};
  border-radius: 20px;
`;
export const FilterButtonContentWrapper = styled.View`
  width: 100%;
  height: 100%;
`;
export const IconContainer = styled.View`
  position: absolute;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  top: 10px;
  left: 10px;
  background-color: #fff;
  border-radius: 40px;
`;
export const FilterButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  position: absolute;
  bottom: 10px;
  left: 15px;
`;
export const FilterButtonCounterText = styled.Text`
  color: #fff;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  font-weight: bold;
  right: 15px;
`;
