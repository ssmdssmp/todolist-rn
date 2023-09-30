import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};
export const tasksReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
});
export const tasksActions = tasksReducer.actions;
export default tasksReducer.reducer;
