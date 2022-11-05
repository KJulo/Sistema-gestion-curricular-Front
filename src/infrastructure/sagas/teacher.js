import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { message } from "antd";

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
  setStudentsAttendance,
  addAttendance,
  setForumsAndContent,
  deleteContent,
  removeContent,
  addContent,
  contentAdded,
  editContent,
  contentEdited,
  addForums,
  forumsAdded,
  editAttendance,
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

function* getStudents() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    yield put(updateStudents(studentList));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* getStudentsNotes() {
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
    yield put(setStudentsAttendance(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* createAttendance(action) {
  const payload = action.payload;
  try {
    yield call(asistencia.addAttendance, payload);
    message.success("Asistencia registrada.");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al registrar la asistencia.");
  }
}

function* goEditAttendance(action) {
  const payload = action.payload;
  try {
    yield call(asistencia.editAttendance, {
      data: payload,
      id: payload.id_asistencia,
    });
    message.success("Campos editados con éxito.");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al editar la asistencia.");
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
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* delContent(action) {
  try {
    const response = yield call(contenido.deleteContent, action.payload);
    yield put(removeContent(response.data.data));
    message.success("Eliminado con éxito.");
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
}

function* createContent(action) {
  try {
    const response = yield call(contenido.createContent, action.payload);
    yield put(contentAdded(response.data.data));
    message.success("Creado con éxito.");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al crear la contenido.");
  }
}

function* goEditContent(action) {
  try {
    const response = yield call(contenido.editContent, action.payload);
    yield put(contentEdited(response.data.data));
    message.success("Editado con éxito.");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al editar la contenido.");
  }
}

function* createForums(action) {
  const { course, forums } = action.payload;
  try {
    for (let i = 0; i < forums.length; i++) {
      const subject = course.asignaturas.find((a) => a.nombre === course.asignatura);
      yield call(foro.createForum, {
        id_asignatura: subject.id,
        titulo: forums[i].nombre,
      });
    }
    message.success(
      "Se han creado las unidades con éxito en el Aula Virtual de " +
        course.nombre +
        " " +
        course.paralelo
    );
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("No se ha podido registrar las unidades con éxito.");
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
function* watchDeleteContent() {
  yield takeLatest(deleteContent, delContent);
}
function* watchCreateContent() {
  yield takeLatest(addContent, createContent);
}
function* watchEditContent() {
  yield takeLatest(editContent, goEditContent);
}
function* watchGoEditAttendance() {
  yield takeLatest(editAttendance, goEditAttendance);
}
function* watchAddForums() {
  yield takeLatest(addForums, createForums);
}

export default [
  watchGetTeacherUser(),
  watchGetCourses(),
  watchGetStudents(),
  watchGetStudentsNotes(),
  watchGetStudentsAttendance(),
  watchCreateAttendance(),
  watchGetForumContent(),
  watchDeleteContent(),
  watchCreateContent(),
  watchEditContent(),
  watchAddForums(),
  watchGoEditAttendance(),
];
