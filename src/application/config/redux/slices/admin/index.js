import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: {},
    courses: [],
    course: {},
    subjects: [],
    subject: {},
    teachers: [],
    teacher: {},
    parents: [],
    parent: {},
    students: [],
    student: {},
  },
  reducers: {
    fetchAdmin: () => {},
    fetchingDataAdmin: (state, action) => {
      state.isFetching = action.payload;
    },
    updateAdmin: (state, action) => {
      state.admin = { ...state.admin, ...action.payload };
    },
    courseFiltersUpdate: (state, action) => {
      state.student = action;
    },
    updateTeachersAdmin: (state, action) => {
      state.teachers = action.payload;
    },
    updateTeacherAdmin: (state, action) => {
      state.teacher = action.payload;
    },
    appendTeacherAdmin: (state, action) => {
      state.teachers = [action.payload, ...state.teachers];
    },
    deleteTeacherAdmin: (state, action) => {
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== action.payload
      );
    },
    updateStudentsAdmin: (state, action) => {
      state.students = action.payload;
    },
    updateStudentAdmin: (state, action) => {
      state.student = action.payload;
    },
    appendStudentAdmin: (state, action) => {
      state.students = [action.payload, ...state.students];
    },
    deleteStudentAdmin: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    updateParentsAdmin: (state, action) => {
      state.parents = action.payload;
    },
    updateParentAdmin: (state, action) => {
      state.parent = action.payload;
    },
    appendParentAdmin: (state, action) => {
      state.parents = [action.payload, ...state.parents];
    },
    deleteParentAdmin: (state, action) => {
      state.parents = state.parents.filter(
        (parent) => parent.id !== action.payload
      );
    },
    updateCoursesAdmin: (state, action) => {
      state.courses = action.payload;
    },
    updateCourseAdmin: (state, action) => {
      state.course = action.payload;
    },
    appendCourseAdmin: (state, action) => {
      state.courses = [action.payload, ...state.courses];
    },
    deleteCourseAdmin: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    updateSubjectAdmin: (state, action) => {
      state.course = {
        ...state.course,
        asignatura: state.course.asignatura.map((asignatura) =>
          asignatura.id === action.payload.id ? action.payload : asignatura
        ),
      };
    },
    filterSubjectCourseAdmin: (state, action) => {
      state.course = {
        ...state.course,
        asignatura: state.course.asignatura.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    },
    updateCourseStudentAdmin: (state, action) => {
      state.course = {
        ...state.course,
        alumno: [...state.course.alumno, action.payload],
      };
    },
    deleteCourseStudentAdmin: (state, action) => {
      state.course = {
        ...state.course,
        alumno: state.course.alumno.filter(
          (alumno) => alumno.id !== action.payload.id
        ),
      };
    },
    updateParentStudentsAdmin: (state, action) => {
      state.parent = {
        ...state.parent,
        alumno:
          state.parent.alumno.findIndex((e) => e.id === action.payload.id) ===
          -1
            ? [...state.parent.alumno, action.payload]
            : state.parent.alumno,
      };
    },
    deleteParentStudentsAdmin: (state, action) => {
      state.parent = {
        ...state.parent,
        alumno: state.parent.alumno.filter(
          (alumno) => alumno.id !== action.payload.id
        ),
      };
    },
  },
});

// ex ortar funciones individuales
export const {
  courseFiltersUpdate,
  fetchAdmin,
  fetchingDataAdmin,
  updateAdmin,
  updateTeachersAdmin,
  updateTeacherAdmin,
  appendTeacherAdmin,
  deleteTeacherAdmin,
  updateParentsAdmin,
  updateParentAdmin,
  appendParentAdmin,
  deleteParentAdmin,
  updateParentStudentsAdmin,
  deleteParentStudentsAdmin,
  updateStudentsAdmin,
  updateStudentAdmin,
  appendStudentAdmin,
  deleteStudentAdmin,
  updateCoursesAdmin,
  updateCourseAdmin,
  appendCourseAdmin,
  deleteCourseAdmin,
  filterSubjectCourseAdmin,
  updateSubjectAdmin,
  updateCourseStudentAdmin,
  deleteCourseStudentAdmin,
} = adminSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default adminSlice.reducer;
