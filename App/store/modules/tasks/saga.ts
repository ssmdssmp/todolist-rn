import firestore from '@react-native-firebase/firestore';
import {put, takeEvery} from 'redux-saga/effects';
import {tasksActions} from './reducer';

const {
  tryGetTasks,
  getTasksFailure,
  getTasksSuccess,
  createNewTaskSuccess,
  tryCreateNewTask,
  createNewTaskFailure,
  changeTaskStatusSuccess,
  changeTaskStatusFailure,
  tryChangeTaskStatus,
  deleteTaskSuccess,
  deleteTaskFailure,
  tryDeleteTask,
} = tasksActions;
function* getTasks(action) {
  try {
    const {uid} = action.payload;
    let arr = [];
    const userTasks = yield firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .get();
    userTasks._docs.map(item => {
      if (Object.keys(item._data).length === 0) {
        return;
      }
      arr.push({...item._data, id: item.ref._documentPath._parts.at(-1)});
    });
    if (arr.length !== 0) {
      yield put(getTasksSuccess(arr));
    } else {
      yield put(getTasksSuccess([]));
    }
  } catch (error) {
    yield put(getTasksFailure(error.toString()));
  }
}

function* createNewTask(action) {
  const {uid, newTask} = action.payload;
  try {
    const newTaskRef = yield firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .add({...newTask});
    const newTaskId = newTaskRef._documentPath._parts.at(-1);
    yield put(createNewTaskSuccess({...newTask, id: newTaskId}));
  } catch (error) {
    yield put(
      createNewTaskFailure({newTask: newTask, error: error.toString()}),
    );
  }
}

function* changeTaskStatus(action) {
  const {uid, taskId, prevState} = action.payload;
  try {
    yield firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({isDone: !prevState});
    yield put(changeTaskStatusSuccess(taskId));
  } catch (error) {
    yield put(changeTaskStatusFailure({id: taskId, error: error.toString()}));
  }
}

function* deleteTask(action) {
  const {taskId, uid} = action.payload;
  try {
    yield firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .delete();
    yield put(deleteTaskSuccess(taskId));
  } catch (error) {
    console.log(error);
    yield put(deleteTaskFailure({id: taskId, error: error.toString()}));
  }
}

export function* watchGetChats() {
  yield takeEvery(tryGetTasks, getTasks);
}
export function* watchCreateNewTask() {
  yield takeEvery(tryCreateNewTask, createNewTask);
}
export function* watchChangeTaskStatus() {
  yield takeEvery(tryChangeTaskStatus, changeTaskStatus);
}
export function* watchDeleteTask() {
  yield takeEvery(tryDeleteTask, deleteTask);
}
