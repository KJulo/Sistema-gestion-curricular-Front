import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Reducers
import { updateUser } from '@slices/user';
import {
  fetchTeacher,
  fetchCourses,
  fetchStudents,
  fetchStudentsNotes,
  updateTeacher,
  updateCourses,
  updateStudents,
  updateStudentsNotes,
} from '@slices/teachers';

// Network
import { profesor, curso, alumno, notas } from '@network/index';

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

function* getStudents() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    yield put(updateStudents(studentList));
  } catch (e) {
    console.log(e);
  }
}

function* getStudentsNotes() {
  try {
    const response = yield call(notas.getNotas);
    const notesList = response.data.data;
    console.log(notesList);
    yield put(updateStudentsNotes(notesList));
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
function* watchGetStudents() {
  yield takeLatest(fetchStudents, getStudents)
}
function* watchGetStudentsNotes() {
  yield takeLatest(fetchStudentsNotes, getStudentsNotes)
}

export default [
  watchGetTeacherUser(),
  watchGetCourses(),
  watchGetStudents(),
  watchGetStudentsNotes(),
]