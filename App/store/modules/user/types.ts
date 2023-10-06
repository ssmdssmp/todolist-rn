import { FirebaseUser } from "../../../types";
import { userActions } from "./actions";
export interface IUserState {
  user: null | FirebaseUser;
  authError: null | string;
}

export type TLoginUserWorker = {
  payload: Parameters<typeof userActions.LoginRequest>[0];
  type: typeof userActions.LoginRequest.type;
};

export type TRegisterUserWorker = {
  payload: Parameters<typeof userActions.RegisterRequest>[0];
  type: typeof userActions.RegisterRequest.type;
};

export type TLogoutUserWorker = {
  type: typeof userActions.logoutRequest.type;
};
