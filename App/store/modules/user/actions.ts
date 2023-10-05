import { createAction } from "@reduxjs/toolkit";
import { sliceActions } from "./reducer";
import { ActionTypes } from "./actionTypes";

export const userActions = {
  ...sliceActions,
  LoginRequest: createAction<{
    email?: string;
    password?: string;
    authType: "firebase" | "google";
  }>(ActionTypes.LOGIN_REQUEST),
  RegisterRequest: createAction<{ email: string; password: string }>(
    ActionTypes.REGISTER_REQUEST
  ),
  logoutRequest: createAction(ActionTypes.LOGOUT_REQUEST),
};
