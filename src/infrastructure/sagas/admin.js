import { call, put, takeLatest } from "redux-saga/effects";

// Reducers
import { fetchAdmin, updateAdmin, updateTeacherAdmin, updateStudentAdmin, updateParentAdmin } from "@slices/admin";
import { updateUser } from "@slices/user";

import {
  FETCH_PARENTS_ADMIN,
  FETCH_STUDENTS_ADMIN,
  FETCH_TEACHERS_ADMIN,
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

function* getTeacher() {
  try {
    const response = yield call(profesor.getTeachers);
    yield put(updateTeacherAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getStudents() {
  try {
    const response = yield call(alumno.getStudents);
    yield put(updateStudentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getParents() {
  try {
    const response = yield call(apoderado.getParents);
    yield put(updateParentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetAdminUser() {
  yield takeLatest(fetchAdmin, getAdmin);
}

function* watchGetTeacher() {
  yield takeLatest(FETCH_TEACHERS_ADMIN, getTeacher);
}

function* watchGetStudents() {
  yield takeLatest(FETCH_STUDENTS_ADMIN, getStudents);
}

function* watchGetParents() {
  yield takeLatest(FETCH_PARENTS_ADMIN, getParents);
}

export default [
  watchGetAdminUser(),
  watchGetTeacher(),
  watchGetStudents(),
  watchGetParents(),
];
