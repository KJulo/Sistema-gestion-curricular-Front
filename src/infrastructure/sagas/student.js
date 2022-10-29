import { call, put, takeLatest } from "redux-saga/effects";

// Reducers
import { updateUser } from "@slices/user";
import { fetchStudent, updateStudent, fetchAttendance, updateAttendance } from "@slices/students";

// Network
import { alumno, asistencia } from "@network/index";

function* getStudent() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    const userData = studentList[0];
    yield put(updateStudent({ ...userData, tipo: "estudiante" }));
    yield put(updateUser({ ...userData, tipo: "estudiante" }));
  } catch (e) {
    console.log(e);
  }
}

function* getAttendance() {
  try {
    const response = (yield call(asistencia.getAttendance)).data.data;
    yield put(updateAttendance(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: e.response.status, error: e.message }));
  }
}

function* watchGetStudentUser() {
  yield takeLatest(fetchStudent, getStudent);
}
function* watchGetAttendance() {
  yield takeLatest(fetchAttendance, getAttendance);
}

export default [watchGetStudentUser(), watchGetAttendance()];
