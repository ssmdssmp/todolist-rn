import {FirebaseUser} from '@/types';
import {createSlice} from '@reduxjs/toolkit';
import {IUserState} from './types';

const initialState: IUserState = {
  user: null,
  error: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    tryLogin: ({payload}: {payload: {email: string; password: string}}) => {},
    loginSuccess: (state, {payload}: {payload: FirebaseUser}) => {
      state.user = payload;
      state.error = null;
    },
    loginFailure: (state, {payload}: {payload: string}) => {
      state.user = null;
      state.error = payload;
    },
    tryRegister: ({
      payload,
    }: {
      payload: {email: string; password: string};
    }) => {},
    registerSuccess: (state, {payload}: {payload: FirebaseUser}) => {
      state.user = payload;
      state.error = null;
    },
    registerFailure: (state, {payload}: {payload: string}) => {
      state.user = null;
      state.error = payload;
    },
    signOut: state => {
      state.user = null;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
    tryLogout: () => {},
    logoutSuccess: state => {
      state.user = null;
      state.error = null;
    },
    logoutFailure: (state, {payload}: {payload: string}) => {
      state.user = null;
      state.error = payload;
    },
    tryLoginWithGoogle: () => {},
    loginWithGoogleSuccess: (state, {payload}: {payload: FirebaseUser}) => {
      state.user = payload;
      state.error = null;
    },
    loginWithGoogleFailure: (state, {payload}: {payload: string}) => {
      state.user = null;
      state.error = payload;
    },
  },
});

export const userActions = userReducer.actions;
export default userReducer.reducer;
