import {StackNavigationProp} from '@react-navigation/stack';
import {
  CREATE_TASK_SCREEN_NAME,
  SETTINGS_SCREEN_NAME,
  TASKLIST_SCREEN_NAME,
} from '../config';

export interface IAppStackParamsList {
  [TASKLIST_SCREEN_NAME]: undefined;
  [SETTINGS_SCREEN_NAME]: undefined;
  [CREATE_TASK_SCREEN_NAME]: undefined;
}

export type AppStackNavigationProp = StackNavigationProp<IAppStackParamsList>;
