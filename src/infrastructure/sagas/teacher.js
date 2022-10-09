import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Reducers
import { fetchTeacher, updateTeacher } from '@slices/teachers';
import { updateUser } from '@slices/user';

// Network
import { profesor } from '@network/index';

function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    const teacherList = response.data.data;
    const userData = teacherList[0]
    yield put(updateTeacher(userData));
    yield put(updateUser(userData));
  } catch(e) {
    console.log(e);
  }
}

function* watchGetTeacherUser() {
  yield takeLatest(fetchTeacher, getTeacher);
}

export default [
  watchGetTeacherUser(),
]