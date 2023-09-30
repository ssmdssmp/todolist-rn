import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};
export const tasksReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setTasks: (state, {payload}) => {
      state.tasks = payload;
    },
    resetTasks: state => {
      state.tasks = [];
    },
  },
});
export const tasksActions = tasksReducer.actions;
export default tasksReducer.reducer;
