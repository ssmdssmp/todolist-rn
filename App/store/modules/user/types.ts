import {FirebaseUser} from '../../../types';

export interface IUserState {
  user: null | FirebaseUser;
  error: null | string;
}
