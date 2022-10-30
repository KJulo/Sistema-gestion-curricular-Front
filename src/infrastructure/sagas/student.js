import { call, put, takeLatest } from "redux-saga/effects";

// Reducers
import { updateUser } from "@slices/user";
import { errorClear, errorFetch } from "@slices/error";
import {
  fetchStudent,
  fetchAttendance,
  fetchMarks,
  updateStudent,
  updateAttendance,
  updateMarks,
} from "@slices/students";

// Network
import { alumno, asistencia, notas, asignatura } from "@network/index";

function* getStudent() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    const userData = studentList[0];
    yield put(updateStudent({ ...userData, tipo: "estudiante" }));
    yield put(updateUser({ ...userData, tipo: "estudiante" }));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getAttendance() {
  try {
    const response = (yield call(asistencia.getAttendance)).data.data;
    yield put(updateAttendance(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getMarks(action) {
  const { payload } = action;
  try {
    const responseMarks = (yield call(notas.getNotas)).data.data;
    const responseSubjects = (yield call(asignatura.getAsignaturas)).data.data;
    if (payload.hasOwnProperty("id")) {
      const markList = responseMarks.filter((r) => r.id_alumno === payload.id);
      yield put(updateMarks({ marks: markList, subjects: responseSubjects }));
    }
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* watchGetStudentUser() {
  yield takeLatest(fetchStudent, getStudent);
}
function* watchGetAttendance() {
  yield takeLatest(fetchAttendance, getAttendance);
}
function* watchGetMarks() {
  yield takeLatest(fetchMarks, getMarks);
}

export default [watchGetStudentUser(), watchGetAttendance(), watchGetMarks()];
