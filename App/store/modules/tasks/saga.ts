import { delay, put, takeLatest } from "redux-saga/effects";

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

function* delayAndClearError() {
  yield delay(3000);
  yield put(clearError());
}
function* getTasksWorker({
  payload,
}: {
  payload: Parameters<typeof getTasksRequest>[0];
  type: typeof getTasksRequest.type;
}) {
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
      delayAndClearError();
    } else {
      yield put(setError("Error getting tasks"));
      delayAndClearError();
    }
  }
}

function* createNewTaskWorker({
  payload,
}: {
  payload: Parameters<typeof CreateNewTaskRequest>[0];
  type: typeof CreateNewTaskRequest.type;
}) {
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
      delayAndClearError();
    } else {
      yield put(setError("Error while creating new task"));
      delayAndClearError();
    }
  }
}

function* changeTaskStatusWorker({
  payload,
}: {
  payload: Parameters<typeof updateTaskStatusRequest>[0];
  type: typeof updateTaskStatusRequest.type;
}) {
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
      delayAndClearError();
    } else {
      yield setError("Error while updating task status");
      delayAndClearError();
    }
  }
}

function* deleteTaskWorker({
  payload,
}: {
  payload: Parameters<typeof deleteTaskRequest>[0];
  type: typeof deleteTaskRequest.type;
}) {
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
      delayAndClearError();
    } else {
      yield put(setError("Error while deleting task"));
      delayAndClearError();
    }
  }
}

export function* watchGetChats() {
  yield takeLatest(getTasksRequest.type, getTasksWorker);
}
export function* watchCreateNewTask() {
  yield takeLatest(CreateNewTaskRequest.type, createNewTaskWorker);
}
export function* watchChangeTaskStatus() {
  yield takeLatest(updateTaskStatusRequest.type, changeTaskStatusWorker);
}
export function* watchDeleteTask() {
  yield takeLatest(deleteTaskRequest.type, deleteTaskWorker);
}
