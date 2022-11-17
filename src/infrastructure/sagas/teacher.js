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
    yield put(updateStudentAttendance(payload));
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
    yield put(updateStudentAttendance(payload));
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
  const { course, forums, deleted } = action.payload;
  try {
    // Añadir o agregar
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

      // Añadir o editar
      if (forums[i].id.includes("noRegistrado")) {
        yield call(foro.createForum, params);
      } else {
        yield call(foro.editForum, { id: forums[i].id, payload: params });
      }
    }
    // Eliminar si está registrado
    for (let i = 0; i < deleted.length; i++) {
      if (!deleted[i].id.includes("noRegistrado")) {
        yield call(foro.deleteForum, deleted[i].id);
      }
    }
    message.success(
      "Se han actualizado las unidades con éxito en el Aula Virtual de " +
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
      newMarks.push(params);
      yield call(notas.addNota, params);
    }
    yield put(appendStudentsMarks(newMarks));
    message.success("Se han creado las notas con éxito");
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("No se ha podido registrar la nota.");
  }
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
    message.success("Se ha añadido la notificación al curso");

    // hacer update a las notificaciones
    yield put(updatingNotificacion(idCurso));
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("No se ha podido registrar o actualizar la notificación.");
  }
}

function* updateNotificationToCourses(action) {
  const { payload } = action;
  console.log(payload);
  try {
    // hacer update a las notificaciones
    const notifications = (yield call(notificacion.getNotifications, {
      payload: { id_curso: payload },
    })).data.data;
    console.log("notificaciones obtenidas con id", notifications, payload);
    yield put(updateNotifications(notifications));
  } catch (e) {
    console.log(e);
    yield put(setIsLoading(false));
    message.error("Error al obtener las notificaciones.");
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
function* watchAddMarks() {
  yield takeLatest(addMarks, createMark);
}
function* watchAddNotification() {
  yield takeLatest(addNotificacion, createNotification);
}
function* watchFetchNotifications() {
  yield takeLatest(updatingNotificacion, updateNotificationToCourses);
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
];
