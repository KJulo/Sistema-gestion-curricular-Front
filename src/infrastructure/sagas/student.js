import { call, put, takeLatest } from "redux-saga/effects";

// Reducers
import { updateUser } from "@slices/user";
import { errorClear, errorFetch } from "@slices/error";
import {
  fetchStudent,
  fetchAttendance,
  fetchMarks,
  fetchCourse,
  fetchForumsAndContent,
  updateStudent,
  updateAttendance,
  updateMarks,
  updateForumsAndContent,
  updateCourse,
} from "@slices/students";

// Network
import {
  alumno,
  asistencia,
  notas,
  asignatura,
  curso,
  foro,
  profesor,
  contenido,
} from "@network/index";

function* getStudent(action) {
  const { payload } = action;
  try {
    yield put(updateStudent({ ...payload, tipo: "estudiante" }));
    yield put(updateUser({ ...payload, tipo: "estudiante" }));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getAttendance() {
  try {
    const responseAttendance = (yield call(asistencia.getAttendance)).data.data;
    const responseSubjects = (yield call(asignatura.getAsignaturas)).data.data;
    const merge = responseAttendance.map((a) => {
      return {
        ...a,
        asignatura: responseSubjects.find((s) => s.id === a.id_asignatura).nombre,
      };
    });
    yield put(updateAttendance(merge));
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

function* getCourse() {
  try {
    const courses = (yield call(curso.getCourses)).data.data;
    const teachers = (yield call(profesor.getTeachers)).data.data;
    const subjects = (yield call(asignatura.getAsignaturas)).data.data;

    // Combinar las asignaturas con su correspondiente curso
    let merged = [];
    for (let i = 0; i < courses.length; i++) {
      // obtener lista de asignaturas
      const subjectList = subjects.filter((subject) => subject.id_curso === courses[i].id);
      const profesor = teachers.find((t) => t.id === courses[i].id_profesor);
      if (subjectList) {
        merged.push({
          ...courses[i],
          asignaturas: subjectList,
          profesor: profesor,
        });
      } else {
        merged.push({
          ...courses[i],
          asignaturas: [],
          profesor: profesor,
        });
      }
    }
    yield put(updateCourse(merged));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
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
    yield put(updateForumsAndContent(forumsWithContent));
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
function* watchGetCourse() {
  yield takeLatest(fetchCourse, getCourse);
}
function* watchForumsAndContent() {
  yield takeLatest(fetchForumsAndContent, getForumsAndContent);
}

export default [
  watchGetStudentUser(),
  watchGetAttendance(),
  watchGetMarks(),
  watchGetCourse(),
  watchForumsAndContent(),
];
