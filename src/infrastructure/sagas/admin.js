import { call, put, takeLatest } from "redux-saga/effects";

// Reducers
import {
  fetchAdmin,
  updateAdmin,

  updateCoursesAdmin,
  updateCourseAdmin,
  appendCourseAdmin,

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
  ADD_PARENT_ADMIN,
  UPDATE_PARENT_ADMIN,
  DELETE_PARENT_ADMIN,
  FETCH_STUDENTS_ADMIN,
  FETCH_STUDENT_ADMIN,
  ADD_STUDENT_ADMIN,
  UPDATE_STUDENT_ADMIN,
  DELETE_STUDENT_ADMIN,
  FETCH_TEACHERS_ADMIN,
  FETCH_TEACHER_ADMIN,
  ADD_TEACHER_ADMIN,
  UPDATE_TEACHER_ADMIN,
  DELETE_TEACHER_ADMIN,
  FETCH_COURSES_ADMIN,
  FETCH_COURSE_ADMIN,
  ADD_COURSE_ADMIN,
  UPDATE_COURSE_ADMIN,
  DELETE_COURSE_ADMIN,
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

function* updateTeacher(action) {
  console.log(action);
  try {
    const response = yield call(profesor.patchTeacher, action.payload);
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

function* addStudent(action) {
  try {
    const response = yield call(alumno.addStudent, action.payload);
    yield put(appendStudentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* updateStudent(action) {
  try {
    const response = yield call(alumno.patchStudent, action.payload);
    yield put(updateStudentAdmin(response.data.data))
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

function* addParent(action) {
  try {
    console.log(action);
    const response = yield call(apoderado.addParent, action.payload);
    yield put(appendParentAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* updateParent(action) {
  try {
    const response = yield call(apoderado.patchParent, action.payload);
    yield put(updateParentAdmin(response.data.data))
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

function* getCourses() {
  try {
    const response = yield call(curso.getCourses);
    yield put(updateCoursesAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* getCourse(action) {
  try {
    const response = yield call(curso.getCourseById, action.payload);
    yield put(updateCourseAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
}

function* addCourse(action) { 
  try {
    const response = yield call(curso.addCourse, action.payload);
    yield put(appendCourseAdmin(response.data.data));
  }
  catch (error) { 
    console.log(error);
  }
}

function* updateCourse(action) { 
  try {
    const response = yield call(curso.patchCourse, action.payload);
    yield put(updateCourseAdmin(response.data.data));
  }
  catch (error) { 
    console.log(error);
  }
}

function* deleteCourse(action) {
  try {
    yield call(curso.deleteCourse, action.payload.id);
    action.payload.navigate("/administrador/cursos");
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

function* watchAddTeacher() {
  yield takeLatest(ADD_TEACHER_ADMIN, addTeacher);
}

function* watchUpdateTeacher() {
  yield takeLatest(UPDATE_TEACHER_ADMIN, updateTeacher);
}

function* watchDeleteTeacher() {
  yield takeLatest(DELETE_TEACHER_ADMIN, deleteTeacher);
}

function* watchGetStudents() {
  yield takeLatest(FETCH_STUDENTS_ADMIN, getStudents);
}

function* watchGetStudent() {
  yield takeLatest(FETCH_STUDENT_ADMIN, getStudent);
}

function* watchAddStudent() {
  yield takeLatest(ADD_STUDENT_ADMIN, addStudent);
}

function* watchUpdateStudent() {
  yield takeLatest(UPDATE_STUDENT_ADMIN, updateStudent);
}

function* watchDeleteStudent() {
  yield takeLatest(DELETE_STUDENT_ADMIN, deleteStudent);
}

function* watchGetParents() {
  yield takeLatest(FETCH_PARENTS_ADMIN, getParents);
}

function* watchGetParent() {
  yield takeLatest(FETCH_PARENT_ADMIN, getParent);
}

function* watchAddParent() {
  yield takeLatest(ADD_PARENT_ADMIN, addParent);
}

function* watchUpdateParent() {
  yield takeLatest(UPDATE_PARENT_ADMIN, updateParent);
}

function* watchDeleteParent() {
  yield takeLatest(DELETE_PARENT_ADMIN, deleteParent);
}

function* watchGetCourses() { 
  yield takeLatest(FETCH_COURSES_ADMIN, getCourses);
}

function* watchGetCourse() { 
  yield takeLatest(FETCH_COURSE_ADMIN, getCourse);
}

function* watchAddCourse() { 
  yield takeLatest(ADD_COURSE_ADMIN, addCourse);
}

function* watchUpdateCourse() { 
  yield takeLatest(UPDATE_COURSE_ADMIN, updateCourse);
}

function* watchDeleteCourse() { 
  yield takeLatest(DELETE_COURSE_ADMIN, deleteCourse);
}

export default [
  watchGetAdminUser(),

  watchGetTeachers(),
  watchGetTeacher(),
  watchAddTeacher(),
  watchUpdateTeacher(),
  watchDeleteTeacher(),

  watchGetStudents(),
  watchGetStudent(),
  watchAddStudent(),
  watchUpdateStudent(),
  watchDeleteStudent(),

  watchGetParents(),
  watchGetParent(),
  watchAddParent(),
  watchUpdateParent(),
  watchDeleteParent(),

  watchGetCourses(),
  watchGetCourse(),
  watchAddCourse(),
  watchUpdateCourse(),
  watchDeleteCourse(),
];
