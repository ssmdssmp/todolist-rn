import { getTasksSelector } from "./selector";
import { ITask } from "@/types";
import firestore from "@react-native-firebase/firestore";
import { put, select, takeLatest } from "redux-saga/effects";
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
} = tasksActions;
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
    const { tasks: oldTasks }: { tasks: ITask[] } = yield select(
      getTasksSelector
    );
    yield put(setError(error.toString()));
    put(setTasks(oldTasks));
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
    } else {
      yield put(setError("Error while creating new task"));
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
    } else {
      yield setError("Error while updating task status");
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
    } else {
      yield put(setError("Error while deleting task"));
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
