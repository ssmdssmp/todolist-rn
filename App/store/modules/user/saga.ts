// authSaga.js
import {put, takeEvery} from 'redux-saga/effects';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {userActions} from './reducer';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const {
  tryLogin,
  tryRegister,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
  logoutSuccess,
  logoutFailure,
  tryLogout,
  tryLoginWithGoogle,
  loginWithGoogleSuccess,
  loginWithGoogleFailure,
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
    if (error.message) {
      if (error.message.toString().indexOf(']') !== -1) {
        console.log(
          error.message
            .toString()
            .slice(Number(error.message.toString().indexOf(']')) + 2),
        );
        yield put(
          loginFailure(
            error.message
              .toString()
              .slice(Number(error.message.toString().indexOf(']')) + 2),
          ),
        );
      } else {
        yield put(loginFailure(error.toString()));
      }
    } else {
      yield put(loginFailure(error.toString()));
    }
  }
}

function* registerUser(action) {
  try {
    const {email, password} = action.payload;
    const userCredential = yield auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    yield firestore()
      .collection('users')
      .doc(userCredential.user.uid)
      .collection('tasks')
      .add({});
    yield put(registerSuccess(userCredential.user));
  } catch (error) {
    if (error.message) {
      if (error.message.toString().includes(']')) {
        yield put(
          registerSuccess(
            error.message.toString().slice(error.message.indexOf(']' + 2)),
          ),
        );
      } else {
        yield put(registerFailure(error.message.toString()));
      }
    } else {
      yield put(registerFailure(error.toString()));
    }
  }
}
export function* logoutUser() {
  try {
    yield auth().signOut();
    yield GoogleSignin.signOut();
    yield put(logoutSuccess({}));
  } catch (error) {
    yield put(logoutFailure(error.toString()));
  }
}
export function* LoginWithGoogle() {
  try {
    const hasPlayServices = yield GoogleSignin.hasPlayServices();
    if (hasPlayServices) {
      const {user} = yield GoogleSignin.signIn();
      const checkRef = yield firestore().collection('users').doc(user.id).get();

      if (!checkRef._exist) {
        yield firestore()
          .collection('users')
          .doc(user.id)
          .collection('tasks')
          .add({});
      }
      yield put(
        loginWithGoogleSuccess({
          displayName: user.givenName,
          email: user.email,
          uid: user.id,
        }),
      );
    }
  } catch (error) {
    yield put(loginWithGoogleFailure(error));
  }
}

export function* watchLogin() {
  yield takeEvery(tryLogin, loginUser);
}

export function* watchRegister() {
  yield takeEvery(tryRegister, registerUser);
}

export function* watchLogout() {
  yield takeEvery(tryLogout, logoutUser);
}

export function* watchLoginWithGoogle() {
  yield takeEvery(tryLoginWithGoogle, LoginWithGoogle);
}
