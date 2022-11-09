import { call, put, takeLatest } from "redux-saga/effects";

// Reducers
import { errorClear, errorFetch } from "@slices/error";
import { updateUser } from "@slices/user";
import {
  fetchParent,
  fetchStudents,
  fetchCourses,
  fetchStudentsNotes,
  fetchAttendance,
  updateParent,
  updateStudents,
  updateCourses,
  updateStudentsNotes,
  updateStudentsAttendance,
} from "@slices/parents";

// Network
import { profesor, curso, alumno, notas, asignatura, asistencia, apoderado } from "@network/index";

function* getParent() {
  try {
    const response = yield call(apoderado.getParents);
    const parentList = response.data.data;
    const userData = parentList[0];
    yield put(updateParent({ ...userData, tipo: "apoderado" }));
    yield put(updateUser({ ...userData, tipo: "apoderado" }));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getStudents() {
  try {
    const response = (yield call(alumno.getStudents)).data.data;
    yield put(updateStudents(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getCourses() {
  try {
    const responseCourses = (yield call(curso.getCourses)).data.data;
    const responseSubjects = (yield call(asignatura.getAsignaturas)).data.data;

    // Combinar las asignaturas con su correspondiente curso
    let merged = [];
    for (let i = 0; i < responseCourses.length; i++) {
      // obtener lista de asignaturas
      const subjectList = responseSubjects.filter(
        (subject) => subject.id_curso === responseCourses[i].id
      );
      if (subjectList) {
        merged.push({
          ...responseCourses[i],
          asignaturas: subjectList,
        });
      } else {
        merged.push({
          ...responseCourses[i],
          asignaturas: [],
        });
      }
    }
    yield put(updateCourses(merged));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getStudentsMarks() {
  try {
    const response = (yield call(notas.getNotas)).data.data;
    yield put(updateStudentsNotes(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getStudentsAttendance() {
  try {
    const response = (yield call(asistencia.getAttendance)).data.data;
    yield put(updateStudentsAttendance(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

//TODO
function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    const teacherList = response.data.data;
    const userData = teacherList[0];
    // yield put(updateTeacher({ ...userData, tipo: "profesor" }));
    // yield put(updateUser({ ...userData, tipo: "profesor" }));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* watchGetParentUser() {
  yield takeLatest(fetchParent, getParent);
}
function* watchGetStudents() {
  yield takeLatest(fetchStudents, getStudents);
}
function* watchGetCourses() {
  yield takeLatest(fetchCourses, getCourses);
}
function* watchGetMarks() {
  yield takeLatest(fetchStudentsNotes, getStudentsMarks);
}
function* watchGetAttendance() {
  yield takeLatest(fetchAttendance, getStudentsAttendance);
}

export default [
  watchGetParentUser(),
  watchGetStudents(),
  watchGetCourses(),
  watchGetMarks(),
  watchGetAttendance(),
];
