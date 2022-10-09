import { call, put, takeLatest } from 'redux-saga/effects';

// Reducers
import { fetchStudent, updateStudent } from '@slices/students';
import { updateUser } from '@slices/user';

// Network
import { alumno } from '@network/index';

function* getStudent() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    const userData = studentList[0]
    yield put(updateStudent(userData));
    yield put(updateUser(userData));
  } catch(e) {
    console.log(e);
  }
}

function* watchGetStudentUser() {
  yield takeLatest(fetchStudent, getStudent);
}

export default [
  watchGetStudentUser(),
]