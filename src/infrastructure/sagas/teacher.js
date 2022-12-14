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
  addMarks,
  appendStudentsMarks,
  updateStudentAttendance,
  addNotificacion,
  updateNotifications,
  updatingNotificacion,
  updateMark,
  updateStudentMark,
  deleteMark,
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
  notificacion,
} from "@network/index";

function* getTeacher(action) {
  const { payload } = action;
  try {
    yield put(updateTeacher({ ...payload, tipo: "profesor" }));
    yield put(updateUser({ ...payload, tipo: "profesor" }));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
  yield put(setIsLoading(false));
}

function* getCourses() {
  try {
    const courses = (yield call(curso.getCourses)).data.data;
    const subjects = (yield call(asignatura.getAsignaturas)).data.data;

    // Combinar las asignaturas y notificaciones con su correspondiente curso
    let merged = [];
    for (let i = 0; i < courses.length; i++) {
      // combinar con lista de asinaturas
      const subjectList = subjects.filter((subject) => subject.id_curso === courses[i].id);
      // // combinar con lista de notificaciones
      // const notifications = (yield call(notificacion.getNotifications, {
      //   params: { id_curso: courses[i].id },
      // })).data.data;
      // const notificationList = notifications.filter((noti) => noti.id_curso === courses[i].id);
      // Combinar todo en uno
      merged.push({
        ...courses[i],
        asignaturas: subjectList != null ? subjectList : [],
        // notificaciones: notificationList != null ? notificationList : [],
      });
    }
    yield put(updateCourses(merged));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
  yield put(setIsLoading(false));
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
  yield put(setIsLoading(false));
}

function* getStudentsNotes() {
  try {
    const response = (yield call(notas.getNotas)).data.data;
    yield put(updateStudentsNotes(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
  yield put(setIsLoading(false));
}

function* changeStudentNote(action) {
  let payload = action.payload;
  try {
    const id = payload.id;
    delete payload["id"];
    const response = yield call(notas.editNota, { id, payload });
    yield put(updateStudentMark(response.data.data));
    message.success("Nota editada.");
  } catch (e) {
    console.log(e);
    message.error("Error al registrar la nota.");
  }
  yield put(setIsLoading(false));
}

function* removeStudentNote(action) {
  const payload = action.payload;
  try {
    const response = yield call(notas.deleteNota, payload.id);
    // Quitar nota para eliminarla de la store
    yield put(updateStudentMark({ ...response.data.data, nota: "" }));
    message.success("Nota eliminada.");
  } catch (e) {
    console.log(e);
    message.error("Error al eliminar la nota.");
  }
  yield put(setIsLoading(false));
}

function* getStudentsAttendance() {
  try {
    const response = (yield call(asistencia.getAttendance)).data.data;
    yield put(setStudentsAttendance(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
  yield put(setIsLoading(false));
}

function* createAttendance(action) {
  const payload = action.payload;
  try {
    yield call(asistencia.addAttendance, payload);
    yield put(updateStudentAttendance(payload));
    message.success("Asistencia registrada.");
  } catch (e) {
    console.log(e);
    message.error("Error al registrar la asistencia.");
  }
  yield put(setIsLoading(false));
}

function* goEditAttendance(action) {
  const payload = action.payload;
  try {
    yield call(asistencia.editAttendance, {
      data: payload,
      id: payload.id_asistencia,
    });
    yield put(updateStudentAttendance(payload));
    message.success("Asistencia registrada.");
  } catch (e) {
    console.log(e);
    message.error("Error al editar la asistencia.");
  }
  yield put(setIsLoading(false));
}

function* getForumsAndContent() {
  try {
    const forums = (yield call(foro.getForums)).data.data;
    const contents = (yield call(contenido.getContents)).data.data;

    // Combinar arreglos
    const forumsWithContent = forums.map((f) => {
      let objs = [""];
      if (f.objetivo) {
        objs = JSON.parse(f.objetivo).data;
      }

      return {
        ...f,
        contenidos: contents.filter((c) => c.id_foro === f.id),
        dateRange: [f.objetivoInicio, f.objetivoTermino],
        objetivos: objs !== [""] ? objs : [],
      };
    });
    yield put(setForumsAndContent(forumsWithContent));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
  yield put(setIsLoading(false));
}

function* delContent(action) {
  try {
    const response = yield call(contenido.deleteContent, action.payload);
    yield put(removeContent(response.data.data));
    message.success("Eliminado con ??xito.");
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: 500, error: "Error de servidor." }));
  }
  yield put(setIsLoading(false));
}

function* createContent(action) {
  try {
    const response = yield call(contenido.createContent, action.payload);
    yield put(contentAdded({ ...response.data.data, id_asignatura: action.payload.id_asignatura }));
    message.success("Creado con ??xito.");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al crear la contenido.");
  }
  yield put(setIsLoading(false));
}

function* goEditContent(action) {
  try {
    const response = yield call(contenido.editContent, action.payload);
    yield put(contentEdited(response.data.data));
    message.success("Editado con ??xito.");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al editar la contenido.");
  }
  yield put(setIsLoading(false));
}

function* createForums(action) {
  const { course, forums, deleted } = action.payload;
  try {
    // A??adir o agregar
    for (let i = 0; i < forums.length; i++) {
      const subject = course.asignaturas.find((a) => a.nombre === course.asignatura);

      // Convertir los objetivos en string para guardarlos en el mismo campo
      let obj = { data: forums[i].objetivos };
      obj = JSON.stringify(obj);

      const params = {
        id_asignatura: subject.id,
        titulo: forums[i].nombre,
        tipo: "unidad",
        objetivo: obj,
        objetivoInicio: forums[i].dateRange[0],
        objetivoTermino: forums[i].dateRange[1],
      };

      // A??adir o editar
      if (forums[i].id.includes("noRegistrado")) {
        yield call(foro.createForum, params);
      } else {
        yield call(foro.editForum, { id: forums[i].id, payload: params });
      }
    }
    // Eliminar si est?? registrado
    for (let i = 0; i < deleted.length; i++) {
      if (!deleted[i].id.includes("noRegistrado")) {
        yield call(foro.deleteForum, deleted[i].id);
      }
    }

    message.success(
      "Se han actualizado las unidades con ??xito en el Aula Virtual de " +
        course.nombre +
        " " +
        course.paralelo
    );
    yield put(fetchForumsAndContent());
    yield put(setIsLoading(false));
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("No se ha podido registrar las unidades.");
  }
  yield put(setIsLoading(false));
}

function* createMark(action) {
  try {
    const { markInformation, courseInformation } = action.payload;
    const { nombre, ponderacion } = markInformation;
    const { courseId, selectedDate, subjectId } = courseInformation;

    // eliminar estos datos para quedarse con los alumnos
    delete markInformation["nombre"];
    delete markInformation["ponderacion"];

    const values = Object.values(markInformation);
    const keys = Object.keys(markInformation);

    const response = (yield call(alumno.getStudents)).data.data;

    let newMarks = [];

    for (let i = 0; i < keys.length; i++) {
      const idStudent = (response?.find((s) => s.rut === keys[i])).id;
      const decimalPonderacion = ponderacion / 100;
      const params = {
        id_asignatura: subjectId,
        id_alumno: idStudent,
        nombre: nombre,
        fecha: selectedDate,
        descripcion: values[i].toString(),
        ponderacion: decimalPonderacion.toString(),
        nota: values[i].toString(),
      };
      const markResponse = yield call(notas.addNota, params);
      newMarks.push(markResponse.data.data);
    }
    yield put(appendStudentsMarks(newMarks));
    message.success("Se han creado las notas con ??xito");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("No se ha podido registrar la nota.");
  }
  yield put(setIsLoading(false));
}

function* createNotification(action) {
  const { idCurso, titulo, descripcion, fecha } = action.payload;
  try {
    const params = {
      id_curso: idCurso,
      titulo: titulo,
      descripcion: descripcion,
      fecha: fecha,
    };

    yield call(notificacion.addNotification, params);
    message.success("Se ha a??adido la notificaci??n al curso");

    // hacer update a las notificaciones
    yield put(updatingNotificacion(idCurso));
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("No se ha podido registrar o actualizar la notificaci??n.");
  }
  yield put(setIsLoading(false));
}

function* updateNotificationToCourses(action) {
  const { payload } = action;
  try {
    // hacer update a las notificaciones
    const notifications = (yield call(notificacion.getNotifications, {
      payload: { id_curso: payload },
    })).data.data;
    yield put(updateNotifications(notifications));
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al obtener las notificaciones.");
  }
  yield put(setIsLoading(false));
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
function* watchAddMarks() {
  yield takeLatest(addMarks, createMark);
}
function* watchAddNotification() {
  yield takeLatest(addNotificacion, createNotification);
}
function* watchFetchNotifications() {
  yield takeLatest(updatingNotificacion, updateNotificationToCourses);
}
function* watchEditStudentNote() {
  yield takeLatest(updateMark, changeStudentNote);
}
function* watchDeleteStudentNote() {
  yield takeLatest(deleteMark, removeStudentNote);
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
  watchAddMarks(),
  watchAddNotification(),
  watchFetchNotifications(),
  watchEditStudentNote(),
  watchDeleteStudentNote(),
];
