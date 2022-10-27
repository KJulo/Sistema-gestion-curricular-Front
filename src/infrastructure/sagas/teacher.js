import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Reducers
import { errorClear, errorFetch } from '@slices/error';
import { updateUser } from '@slices/user';
import {
  setIsLoading,
  fetchTeacher,
  fetchCourses,
  fetchStudents,
  fetchStudentsNotes,
  fetchAttendance,
  updateTeacher,
  updateCourses,
  updateStudents,
  updateStudentsNotes,
  setStudentsAttendance,
  addAttendance,
} from '@slices/teachers';

// Network
import { profesor, curso, alumno, notas, asignatura, asistencia } from '@network/index';

function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    const teacherList = response.data.data;
    const userData = teacherList[0]
    yield put(updateTeacher({...userData, tipo: 'profesor' }));
    yield put(updateUser({...userData, tipo: 'profesor' }));
  } catch(e) {
    console.log(e);
    yield put(errorFetch({ code: '500', error: 'Error en la respuesta del servidor.'}));
  }
}

function* getCourses() {
  try {
    const responseCourses = (yield call(curso.getCourses)).data.data;
    const responseSubjects = (yield call(asignatura.getAsignaturas)).data.data;

    // Combinar las asignaturas con su correspondiente curso
    let merged = [];
    for(let i=0; i < responseCourses.length; i++) {
      // obtener lista de asignaturas
      const subjectList = responseSubjects.filter((subject) => subject.id_curso === responseCourses[i].id)
      if (subjectList) {
        merged.push({
          ...responseCourses[i],
          asignaturas: subjectList
        })
      } else {
        merged.push({
          ...responseCourses[i],
          asignaturas: []
        })
      }
    }
    yield put(updateCourses(merged));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: '500', error: 'Error en la respuesta del servidor.'}));
  }
}

function* getStudents() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    yield put(updateStudents(studentList));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: '500', error: 'Error en la respuesta del servidor.'}));
  }
}

function* getStudentsNotes() {
  try {
    const response = (yield call(notas.getNotas)).data.data;
    yield put(updateStudentsNotes(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: '500', error: 'Error en la respuesta del servidor.'}));
  }
}

function* getStudentsAttendance() {
  try {
    const response = (yield call(asistencia.getAttendance)).data.data;
    yield put(setStudentsAttendance(response));
  } catch (e) {
    console.log(e);
    yield put(errorFetch({ code: '500', error: 'Error en la respuesta del servidor.'}));
  }
}

function* createAttendance(action) {
  const payload = action.payload
  console.log(payload);
  try {
    /**
     * TODO
     * ! Falta obtener id_asignatura
     * * enviar
     * * id_asignatura,
     * * id_alumno,
     * * asistencia,
     * * fecha
     */

    const response = (yield call(asistencia.addAttendance, payload)).data.data;
    console.log("response: ", response);

  } catch (e) {
    console.log(e);
    yield put(e);
    yield put(errorFetch({ code: 500, error: 'Error en la respuesta del servidor.'}));
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
function* watchGetStudentsAttendance() {
  yield takeLatest(fetchAttendance, getStudentsAttendance)
}
function* watchCreateAttendance() {
  yield takeLatest(addAttendance, createAttendance);
}

export default [
  watchGetTeacherUser(),
  watchGetCourses(),
  watchGetStudents(),
  watchGetStudentsNotes(),
  watchGetStudentsAttendance(),
  watchCreateAttendance(),
]