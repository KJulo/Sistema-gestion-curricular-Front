import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Reducers
import { fetchTeacher, updateTeacher } from '@slices/teachers';

// Network
import { profesor } from '@network/index';

function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    const teacherList = response.data.data;
    yield put(updateTeacher(teacherList[0]));
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