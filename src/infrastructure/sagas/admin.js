import { call, put, takeLatest } from "redux-saga/effects";

// Reducers
import {
  fetchAdmin,
  updateAdmin,
  updateTeachersAdmin,
  updateTeacherAdmin,
  appendTeacherAdmin,
  updateStudentsAdmin,
  updateStudentAdmin,
  appendStudentAdmin,
  updateParentsAdmin,
  updateParentAdmin,
  appendParentAdmin,
} from "@slices/admin";
import { updateUser } from "@slices/user";

import {
  FETCH_PARENTS_ADMIN,
  FETCH_PARENT_ADMIN,
  DELETE_PARENT_ADMIN,
  ADD_PARENT_ADMIN,
  FETCH_STUDENTS_ADMIN,
  FETCH_STUDENT_ADMIN,
  DELETE_STUDENT_ADMIN,
  ADD_STUDENT_ADMIN,
  FETCH_TEACHERS_ADMIN,
  FETCH_TEACHER_ADMIN,
  DELETE_TEACHER_ADMIN,
  ADD_TEACHER_ADMIN,
} from "./types/admin";

// Network
import {
  administrador,
  alumno,
  curso,
  apoderado,
  profesor,
} from "@network/index";

function* getAdmin() {
  try {
    const response = yield call(administrador.getAdmins);
    const adminList = response.data.data;
    const userData = adminList[0];
    yield put(updateAdmin({ ...userData, tipo: "administrador" }));
    yield put(updateUser({ ...userData, tipo: "administrador" }));
  } catch (e) {
    console.log(e);
  }
}

function* getTeachers() {
  try {
    const response = yield call(profesor.getTeachers);
    yield put(updateTeachersAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getTeacher(action) {
  try {
    const response = yield call(profesor.getTeacherById, action.payload);
    yield put(updateTeacherAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* deleteTeacher(action) {
  try {
    yield call(profesor.deleteTeacher, action.payload.id);
    action.payload.navigate("/administrador/profesores");
  } catch (error) {
    console.log(error);
  }
}

function* addTeacher(action) {
  try {
    console.log(action);
    const response = yield call(profesor.addTeacher, action.payload);
    console.log(response);
    yield put(appendTeacherAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getStudents() {
  try {
    const response = yield call(alumno.getStudents);
    yield put(updateStudentsAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getStudent(action) {
  try {
    const response = yield call(alumno.getStudentById, action.payload);
    yield put(updateStudentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* deleteStudent(action) {
  try {
    yield call(alumno.deleteStudent, action.payload.id);
    action.payload.navigate("/administrador/alumnos");
  } catch (error) {
    console.log(error);
  }
}

function* addStudent(action) {
  try {
    const response = yield call(alumno.addStudent, action.payload);
    yield put(appendStudentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getParents() {
  try {
    const response = yield call(apoderado.getParents);
    yield put(updateParentsAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getParent(action) {
  try {
    const response = yield call(apoderado.getParentById, action.payload);
    yield put(updateParentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* deleteParent(action) {
  try {
    yield call(apoderado.deleteParent, action.payload.id);
    action.payload.navigate("/administrador/apoderados");
  } catch (error) {
    console.log(error);
  }
}

function* addParent(action) {
  try {
    console.log(action);
    const response = yield call(apoderado.addParent, action.payload);
    yield put(appendParentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetAdminUser() {
  yield takeLatest(fetchAdmin, getAdmin);
}

function* watchGetTeachers() {
  yield takeLatest(FETCH_TEACHERS_ADMIN, getTeachers);
}

function* watchGetTeacher() {
  yield takeLatest(FETCH_TEACHER_ADMIN, getTeacher);
}

function* watchDeleteTeacher() {
  yield takeLatest(DELETE_TEACHER_ADMIN, deleteTeacher);
}

function* watchAddTeacher() {
  yield takeLatest(ADD_TEACHER_ADMIN, addTeacher);
}

function* watchGetStudents() {
  yield takeLatest(FETCH_STUDENTS_ADMIN, getStudents);
}

function* watchGetStudent() {
  yield takeLatest(FETCH_STUDENT_ADMIN, getStudent);
}

function* watchDeleteStudent() {
  yield takeLatest(DELETE_STUDENT_ADMIN, deleteStudent);
}

function* watchAppendStudent() {
  yield takeLatest(ADD_STUDENT_ADMIN, addStudent);
}

function* watchGetParents() {
  yield takeLatest(FETCH_PARENTS_ADMIN, getParents);
}

function* watchGetParent() {
  yield takeLatest(FETCH_PARENT_ADMIN, getParent);
}

function* watchDeleteParent() {
  yield takeLatest(DELETE_PARENT_ADMIN, deleteParent);
}

function* watchAddParent() {
  yield takeLatest(ADD_PARENT_ADMIN, addParent);
}

export default [
  watchGetAdminUser(),

  watchGetTeachers(),
  watchGetTeacher(),
  watchAddTeacher(),
  watchDeleteTeacher(),

  watchGetStudents(),
  watchGetStudent(),
  watchDeleteStudent(),
  watchAppendStudent(),

  watchGetParents(),
  watchGetParent(),
  watchDeleteParent(),
  watchAddParent(),
];
