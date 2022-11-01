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
  filterSubjectCourseAdmin,
  updateSubjectAdmin,
  updateCourseStudentAdmin,
  deleteCourseStudentAdmin,
  updateParentStudentsAdmin,
  deleteParentStudentsAdmin,
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
  APPEND_STUDENT_PARENT_ADMIN,
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
  APPEND_COURSE_STUDENT_ADMIN,
  DELETE_COURSE_STUDENT_ADMIN,
  APPEND_COURSE_TEACHER_ADMIN,
  DELETE_COURSE_TEACHER_ADMIN,
  DELETE_SUBJECT_ADMIN,
  UPDATE_SUBJECT_ADMIN,
  UPDATE_PARENT_STUDENTS_ADMIN,
  DELETE_PARENT_STUDENT_ADMIN,
} from "./types/admin";

// Network
import {
  administrador,
  alumno,
  curso,
  apoderado,
  profesor,
  asignatura,
} from "@network/index";
import { message } from "antd";

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
    const response = yield call(profesor.addTeacher, action.payload);
    yield put(appendTeacherAdmin(response.data.data));
    message.success("Se ha creado el profesor con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido crear el profesor");
    console.log(error);
  }
}

function* updateTeacher(action) {
  console.log(action);
  try {
    const response = yield call(profesor.patchTeacher, action.payload);
    yield put(updateTeacherAdmin(response.data.data));
    message.success("Profesor actualizado con exito.");
  } catch (error) {
    message.success(
      "Debido a un error, no se ha podido actualizar el profesor"
    );
    console.log(error);
  }
}

function* deleteTeacher(action) {
  try {
    yield call(profesor.deleteTeacher, action.payload.id);
    message.success("Se ha eliminado el profesor con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido eliminar al profesor");
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
    message.success("Se ha creado el alumno con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido crear el alumno");
    console.log(error);
  }
}

function* updateStudent(action) {
  try {
    console.log(action);
    const response = yield call(alumno.patchStudent, action.payload);
    yield put(updateStudentAdmin(response.data.data));
    if (action.payload.contrasena) {
      message.success("Se ha editado el alumno con exito");
    } else {
      if (action.payload.id_apoderado) {
        message.success("Se ha agregado el apoderado con exito");
      } else {
        message.success("Se ha eliminado el apoderado con exito");
      }
    }
  } catch (error) {
    if (action.payload.contrasena) {
      message.error("Debido a un error, no se ha podido editar el alumno");
    } else {
      if (action.payload.id_apoderado) {
        message.error("Debido a un error, no se ha podido agregar el apoderado");
      } else {
        message.error("Debido a un error, no se ha podido eliminar el apoderado");
      }
    }
    console.log(error);
  }
}

function* deleteStudent(action) {
  try {
    yield call(alumno.deleteStudent, action.payload.id);
    message.success("Se ha eliminado el alumno con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido eliminar el alumno");
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
    message.success("Se ha agregado el apoderado con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido agregar el apoderado");
    console.log(error);
  }
}

function* updateParent(action) {
  try {
    const response = yield call(apoderado.patchParent, action.payload);
    yield put(updateParentAdmin(response.data.data));
    message.success("Se ha editado el apoderado con exito");
  } catch (error) {
    message.error(
      "Debido a un error, no se ha podido editar el apoderado con exito"
    );
    console.log(error);
  }
}

function* deleteParent(action) {
  try {
    yield call(apoderado.deleteParent, action.payload.id);
    message.success("Se ha eliminado el apoderado con exito");
  } catch (error) {
    message.error(
      "Debido a un error, no se ha podido editar el apoderado con exito"
    );
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
    message.success("Curso creado con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha creado el curso.");
    console.log(error);
  }
}

function* updateCourse(action) {
  try {
    console.log(action);
    const response = yield call(curso.patchCourse, action.payload);
    yield put(updateCourseAdmin(response.data.data));
    if (action.payload.asignatura) {
      message.success("Asignatura creada con exito");
    } else {
      message.success("Curso editado con exito");
    }
  } catch (error) {
    message.error("Debido a un error, no se ha editado el curso");
    console.log(error);
  }
}

function* deleteCourse(action) {
  try {
    yield call(curso.deleteCourse, action.payload.id);
    message.success("Curso eliminado con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido eliminar el curso");
    console.log(error);
  }
}

function* appendStudentCourse(action) {
  try {
    console.log(action);
    const response = yield call(alumno.patchStudent, action.payload);
    yield put(updateCourseStudentAdmin(response.data.data));
    message.success("Se ha agregado con exito el alumno al curso");
  } catch (error) {
    message.error(
      "Debido a un error, no se ha podido agregar el alumno al curso"
    );
    console.log(error);
  }
}

function* appendTeacherCourse(action) {
  try {
    console.log(action);
    const response = yield call(curso.patchCourse, action.payload);
    console.log(response);
    yield put(updateCourseAdmin(response.data.data));
    if (action.payload.id_profesor) {
      message.success("Se ha agregado el profesor jefe con exito");
    } else {
      message.success("Se ha eliminado el profesor jefe con exito");
    }
  } catch (error) {
    message.error(
      "Debido a un error, no se ha podido agregar el profesor jefe al curso"
    );
    console.log(error);
  }
}

function* deleteStudentCourse(action) {
  try {
    console.log(action);
    const response = yield call(alumno.patchStudent, action.payload);
    console.log(response);
    yield put(deleteCourseStudentAdmin(response.data.data));
    message.success("Se ha eliminado el alumno perteneciente al curso");
  } catch (error) {
    message.error(
      "Debido a un error, no se ha podido eliminar el alumno del curso"
    );
    console.log(error);
  }
}

function* deleteSubject(action) {
  try {
    const response = yield call(asignatura.deleteSubject, action.payload);
    console.log(response);
    yield put(filterSubjectCourseAdmin(response.data.data));
    message.success("Se ha eliminado la asignatura del curso");
  } catch (error) {
    message.error(
      "Debido a un error, no se ha podido eliminar la asignatura del curso"
    );
    console.log(error);
  }
}

function* updateSubject(action) {
  try {
    const response = yield call(asignatura.patchSubject, action.payload);
    console.log(response);
    yield put(updateSubjectAdmin(response.data.data));
    message.success("Se ha editado la asignatura con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido editar la asignatura");
    console.log(error);
  }
}

function* appendParentStudents(action) {
  try {
    const response = yield call(alumno.patchStudent, action.payload);
    yield put(updateParentStudentsAdmin(response.data.data));
    message.success("Se ha agregado el alumno con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido agregar el alumno");
    console.log(error);
  }
}

function* deleteParentStudent(action) {
  try {
    const response = yield call(alumno.patchStudent, action.payload);
    console.log(response);
    yield put(deleteParentStudentsAdmin(response.data.data));
    message.success("Se ha eliminado el alumno con exito");
  } catch (error) {
    message.error("Debido a un error, no se ha podido eliminar el alumno");
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

function* watchAppendStudentCourse() {
  yield takeLatest(APPEND_COURSE_STUDENT_ADMIN, appendStudentCourse);
}

function* watchAppendTeacherCourse() {
  yield takeLatest(APPEND_COURSE_TEACHER_ADMIN, appendTeacherCourse);
}

function* watchDeleteSubject() {
  yield takeLatest(DELETE_SUBJECT_ADMIN, deleteSubject);
}

function* watchUpdateSubject() {
  yield takeLatest(UPDATE_SUBJECT_ADMIN, updateSubject);
}

function* watchDeleteStudentCourse() {
  yield takeLatest(DELETE_COURSE_STUDENT_ADMIN, deleteStudentCourse);
}

function* watchAppendParentStudents() {
  yield takeLatest(UPDATE_PARENT_STUDENTS_ADMIN, appendParentStudents);
}

function* watchDeleteParentStudent() {
  yield takeLatest(DELETE_PARENT_STUDENT_ADMIN, deleteParentStudent);
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
  watchAppendParentStudents(),
  watchDeleteParentStudent(),

  watchGetCourses(),
  watchGetCourse(),
  watchAddCourse(),
  watchUpdateCourse(),
  watchDeleteCourse(),
  watchAppendTeacherCourse(),
  watchDeleteStudentCourse(),
  watchAppendStudentCourse(),

  watchDeleteSubject(),
  watchUpdateSubject(),
];
