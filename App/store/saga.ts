import { all } from "redux-saga/effects";
import {
  watchChangeTaskStatus,
  watchCreateNewTask,
  watchDeleteTask,
  watchGetChats,
} from "./modules/tasks/saga";
import { watchLogin, watchLogout, watchRegister } from "./modules/user/saga";
function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchGetChats(),
    watchCreateNewTask(),
    watchChangeTaskStatus(),
    watchDeleteTask(),
    watchLogout(),
  ]);
}

export default rootSaga;
