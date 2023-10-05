import { TPayload } from "./../../types";
import { FirebaseUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";

const initialState: IUserState = {
  user: null,
  authError: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: TPayload<FirebaseUser>) => {
      state.user = payload;
      state.authError = null;
    },
    setAuthError: (state, { payload }: TPayload<string>) => {
      state.user = null;
      state.authError = payload;
    },
    logout: (state) => {
      state.user = null;
      state.authError = null;
    },
    clearError: (state) => {
      state.authError = null;
    },
  },
});

export const sliceActions = userReducer.actions;
export default userReducer.reducer;
