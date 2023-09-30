import {tasksReducer, userReducer} from './modules';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  user: userReducer,
});
