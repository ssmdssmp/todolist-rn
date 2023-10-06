import { tasksSaga, userSaga } from "./modules";

import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([userSaga(), tasksSaga()]);
}

export default rootSaga;
