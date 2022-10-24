import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Reducers
import { updateUser } from '@slices/user';
import {
  fetchTeacher,
  fetchCourses,
  fetchStudents,
  fetchStudentsNotes,
  updateTeacher,
  updateCourses,
  updateStudents,
  updateStudentsNotes,
} from '@slices/teachers';

// Network
import { profesor, curso, alumno, notas, asignatura } from '@network/index';

function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    const teacherList = response.data.data;
    const userData = teacherList[0]
    yield put(updateTeacher({...userData, tipo: 'profesor' }));
    yield put(updateUser({...userData, tipo: 'profesor' }));
  } catch(e) {
    console.log(e);
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
  }
}

function* getStudents() {
  try {
    const response = yield call(alumno.getStudents);
    const studentList = response.data.data;
    yield put(updateStudents(studentList));
  } catch (e) {
    console.log(e);
  }
}

function* getStudentsNotes() {
  try {
    const response = (yield call(notas.getNotas)).data.data;
    yield put(updateStudentsNotes(response));
  } catch (e) {
    console.log(e);
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

export default [
  watchGetTeacherUser(),
  watchGetCourses(),
  watchGetStudents(),
  watchGetStudentsNotes(),
]