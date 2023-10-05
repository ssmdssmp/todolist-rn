import { FirebaseUser } from "../../../types";

export interface IUserState {
  user: null | FirebaseUser;
  authError: null | string;
}
