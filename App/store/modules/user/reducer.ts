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
    tryLogin: () => {},
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    tryRegister: () => {},
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    signOut: state => {
      state.user = null;
      state.error = null;
    },
  },
});

export const userActions = userReducer.actions;
export default userReducer.reducer;
