import {all} from 'redux-saga/effects';
import {watchLogin, watchRegister} from './modules/user/saga';
function* rootSaga() {
  yield all([watchLogin(), watchRegister()]);
}

export default rootSaga;
