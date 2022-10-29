import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Reducers
import { errorClear, errorFetch } from "@slices/error";
import { updateUser } from "@slices/user";
import {
  setIsLoading,
  fetchTeacher,
  fetchCourses,
  fetchStudents,
  fetchStudentsNotes,
  fetchAttendance,
  fetchForumsAndContent,
  updateTeacher,
  updateCourses,
  updateStudents,
  updateStudentsNotes,
  // setStudentsAttendance,
  addAttendance,
  setForumsAndContent,
} from "@slices/teachers";

// Network
import {
  profesor,
  curso,
  alumno,
  notas,
  asignatura,
  asistencia,
  foro,
  contenido,
} from "@network/index";

function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    const teacherList = response.data.data;
    const userData = teacherList[0];
    yield put(updateTeacher({ ...userData, tipo: "profesor" }));
    yield put(updateUser({ ...userData, tipo: "profesor" }));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: e.response.status, error: e.message }));
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
    yield put(errorFetch({ code: e.response.status, error: e.message }));
  }
}

function* getStudents() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    yield put(updateStudents(studentList));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: e.response.status, error: e.message }));
  }
}

function* getStudentsNotes() {
  try {
    const response = (yield call(notas.getNotas)).data.data;
    yield put(updateStudentsNotes(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: e.response.status, error: e.message }));
  }
}

function* getStudentsAttendance() {
  try {
    const response = (yield call(asistencia.getAttendance)).data.data;
    // yield put(setStudentsAttendance(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: e.response.status, error: e.message }));
  }
}

function* createAttendance(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    /**
     * TODO
     * * id_asignatura,
     * * id_alumno,
     * * asistencia,
     * ! fecha : problema con insertarla en el backend
     */

    const response = (yield call(asistencia.addAttendance, payload)).data.data;
    console.log("response: ", response);
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: e.response.status, error: e.message }));
  }
}

function* getForumsAndContent() {
  try {
    const forums = (yield call(foro.getForums)).data.data;
    const contents = (yield call(contenido.getContents)).data.data;
    // combinar arreglos
    const forumsWithContent = forums.map((f) => {
      return {
        ...f,
        contenidos: contents.filter((c) => c.id_foro === f.id),
      };
    });
    yield put(setForumsAndContent(forumsWithContent));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: e.response.status, error: e.message }));
  }
}

function* watchGetTeacherUser() {
  yield takeLatest(fetchTeacher, getTeacher);
}
function* watchGetCourses() {
  yield takeLatest(fetchCourses, getCourses);
}
function* watchGetStudents() {
  yield takeLatest(fetchStudents, getStudents);
}
function* watchGetStudentsNotes() {
  yield takeLatest(fetchStudentsNotes, getStudentsNotes);
}
function* watchGetStudentsAttendance() {
  yield takeLatest(fetchAttendance, getStudentsAttendance);
}
function* watchCreateAttendance() {
  yield takeLatest(addAttendance, createAttendance);
}
function* watchGetForumContent() {
  yield takeLatest(fetchForumsAndContent, getForumsAndContent);
}

export default [
  watchGetTeacherUser(),
  watchGetCourses(),
  watchGetStudents(),
  watchGetStudentsNotes(),
  watchGetStudentsAttendance(),
  watchCreateAttendance(),
  watchGetForumContent(),
];
