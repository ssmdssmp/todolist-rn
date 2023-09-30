import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    username: '',
  },
};
export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});
export const userActions = userReducer.actions;
export default userReducer.reducer;
