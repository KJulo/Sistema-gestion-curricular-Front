import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Reducers
import { updateUser } from '@slices/user';
import {
  fetchTeacher,
  updateTeacher,
  fetchCourses,
  updateCourses,
} from '@slices/teachers';

// Network
import { profesor, curso } from '@network/index';

function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    const teacherList = response.data.data;
    const userData = teacherList[0]
    yield put(updateTeacher({...userData, tipo: 'profesor' }));
    yield put(updateUser({...userData, tipo: 'profesor' }));
  } catch(e) {
    console.log(e);
  }
}

function* getCourses() {
  try {
    const response = yield call(curso.getCourses);
    const courseList = response.data.data;
    yield put(updateCourses(courseList));
  } catch (e) {
    console.log(e);
  }
}

function* watchGetTeacherUser() {
  yield takeLatest(fetchTeacher, getTeacher);
}
function* watchGetCourses() {
  yield takeLatest(fetchCourses, getCourses);
}

export default [
  watchGetTeacherUser(),
  watchGetCourses(),
]