import { delay, put, takeLatest } from "redux-saga/effects";
import firestore from "@react-native-firebase/firestore";
import { userActions } from "./actions";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const {
  LoginRequest,
  RegisterRequest,
  logoutRequest,
  setUser,
  setAuthError,
  logout,
  clearError,
} = userActions;
function* loginUserWorker({
  payload,
}: {
  payload: {
    email: string;
    password: string;
    authType: "firebase" | "google";
  };
  type: typeof LoginRequest.type;
}) {
  try {
    const { email, password, authType } = payload;
    if (authType === "firebase") {
      const { user } = yield auth().signInWithEmailAndPassword(email, password);
      yield put(setUser(user));
    }
    if (authType === "google") {
      const hasPlayServices: boolean = yield GoogleSignin.hasPlayServices();
      if (hasPlayServices) {
        const { user } = yield GoogleSignin.signIn();
        const checkRef = yield firestore()
          .collection("users")
          .doc(user.id)
          .collection("tasks")
          .get();
        yield console.log(checkRef._docs);
        if (checkRef._docs.length === 0) {
          yield firestore()
            .collection("users")
            .doc(user.id)
            .collection("tasks")
            .add({});
        }
        yield put(
          setUser({
            displayName: user.givenName,
            email: user.email,
            uid: user.id,
          })
        );
      } else {
        yield put(
          setAuthError(
            "Your device has no Google Play Services installed. Try install it or use other auth method"
          )
        );
        yield delay(3000);
        yield put(clearError());
        return;
      }
    }
  } catch (error) {
    if (error) {
      yield put(setAuthError(error.toString()));
      yield delay(3000);
      yield put(clearError());
    } else {
      setAuthError("Auth error. Check your connection and try again");
      yield delay(3000);
      yield put(clearError());
    }
  }
}

function* registerUserWorker({
  payload,
}: {
  payload: { email: string; password: string };
  type: typeof RegisterRequest.type;
}) {
  try {
    const { email, password } = payload;
    const { user } = yield auth().createUserWithEmailAndPassword(
      email,
      password
    );
    yield firestore()
      .collection("users")
      .doc(user.uid)
      .collection("tasks")
      .add({});
    yield put(setUser(user));
  } catch (error) {
    if (error) {
      setAuthError(error.toString());
      yield delay(3000);
      yield put(clearError());
    } else {
      setAuthError("Auth error. Check your connection and try again");
      yield delay(3000);
      yield put(clearError());
    }
  }
}
export function* logoutUserWorker({}: { type: typeof logoutRequest.type }) {
  try {
    yield auth().signOut();
    yield GoogleSignin.signOut();
    yield put(logout());
  } catch (error) {
    yield put(logout());
  }
}

export function* watchLogin() {
  yield takeLatest(LoginRequest.type, loginUserWorker);
}

export function* watchRegister() {
  yield takeLatest(RegisterRequest.type, registerUserWorker);
}

export function* watchLogout() {
  yield takeLatest(logoutRequest.type, logoutUserWorker);
}
