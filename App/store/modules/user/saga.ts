// authSaga.js
import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {userActions} from './reducer';
import auth from '@react-native-firebase/auth';
const {
  tryLogin,
  tryRegister,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
} = userActions;
function* loginUser(action) {
  try {
    const {email, password} = action.payload;
    const userCredential = yield auth().signInWithEmailAndPassword(
      email,
      password,
    );
    yield put(loginSuccess(userCredential.user));
  } catch (error) {
    yield put(loginFailure(error.message));
    console.log(error);
  }
}

function* registerUser(action) {
  try {
    const {email, password} = action.payload;
    const userCredential = yield auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    yield put(registerSuccess(userCredential.user));
  } catch (error) {
    console.log(error);
    yield put(registerFailure(error.message));
  }
}

export function* watchLogin() {
  yield takeEvery(tryLogin, loginUser);
}

export function* watchRegister() {
  yield takeEvery(tryRegister, registerUser);
}
