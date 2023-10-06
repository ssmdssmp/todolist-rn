import {
  TChangeTaskStatusWorker,
  TCreateNewTaskWorker,
  TDeleteTaskWorker,
  TTaskWorker,
} from "./types";
import { all, delay, put, takeLatest } from "redux-saga/effects";

import { ITask } from "@/types";
import firestore from "@react-native-firebase/firestore";
import { tasksActions } from "./actions";

const {
  getTasksRequest,
  updateTaskStatusRequest,
  deleteTaskRequest,
  CreateNewTaskRequest,
  updateTaskStatus,
  createNewTask,
  deleteTask,
  setTasks,
  setError,
  clearError,
} = tasksActions;

function* getTasksWorker({ payload }: TTaskWorker) {
  try {
    const { uid } = payload;
    let tasksArr: ITask[] = [];
    const userTasks = yield firestore()
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .get();
    userTasks._docs.map((item) => {
      if (Object.keys(item._data).length === 0) {
        return;
      }
      tasksArr.push({
        ...item._data,
        id: item.ref._documentPath._parts.at(-1),
      });
    });
    if (tasksArr.length !== 0) {
      yield put(setTasks(tasksArr));
    } else {
      yield put(setTasks([]));
    }
  } catch (error) {
    if (error) {
      yield put(setError("Error getting tasks: " + setError(error.toString())));
      yield delay(3000);
      yield put(clearError());
    } else {
      yield put(setError("Error getting tasks"));
      yield delay(3000);
      yield put(clearError());
    }
  }
}

function* createNewTaskWorker({ payload }: TCreateNewTaskWorker) {
  const { uid, newTask } = payload;
  try {
    const newTaskRef = yield firestore()
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .add({ ...newTask });
    const newTaskId = newTaskRef._documentPath._parts.at(-1);
    yield put(createNewTask({ ...newTask, id: newTaskId }));
  } catch (error) {
    if (error) {
      yield put(setError("Error while creating new task: " + error.toString()));
      yield delay(3000);
      yield put(clearError());
    } else {
      yield put(setError("Error while creating new task"));
      yield delay(3000);
      yield put(clearError());
    }
  }
}

function* changeTaskStatusWorker({ payload }: TChangeTaskStatusWorker) {
  const { uid, taskId, prevState } = payload;
  try {
    yield firestore()
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .doc(taskId)
      .update({ isDone: !prevState });
    yield put(updateTaskStatus(taskId));
  } catch (error) {
    if (error) {
      yield setError("Error while updating task status: " + error.toString());
      yield delay(3000);
      yield put(clearError());
    } else {
      yield setError("Error while updating task status");
      yield delay(3000);
      yield put(clearError());
    }
  }
}

function* deleteTaskWorker({ payload }: TDeleteTaskWorker) {
  const { taskId, uid } = payload;
  try {
    yield firestore()
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .doc(taskId)
      .delete();
    yield put(deleteTask(taskId));
  } catch (error) {
    if (error) {
      yield put(setError("Error while deleting task: " + error.toString()));
      yield delay(3000);
      yield put(clearError());
    } else {
      yield put(setError("Error while deleting task"));
      yield delay(3000);
      yield put(clearError());
    }
  }
}

function* watchGetChats() {
  yield takeLatest(getTasksRequest.type, getTasksWorker);
}
function* watchCreateNewTask() {
  yield takeLatest(CreateNewTaskRequest.type, createNewTaskWorker);
}
function* watchChangeTaskStatus() {
  yield takeLatest(updateTaskStatusRequest.type, changeTaskStatusWorker);
}
function* watchDeleteTask() {
  yield takeLatest(deleteTaskRequest.type, deleteTaskWorker);
}

export function* tasksSaga() {
  yield all([
    watchGetChats(),
    watchCreateNewTask(),
    watchChangeTaskStatus(),
    watchDeleteTask(),
  ]);
}
