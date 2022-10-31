import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: {},
    courses: [{}],
    course: {},
    subjects: [{}],
    subject: {},
    teachers: [{}],
    teacher: {},
    parents: [{}],
    parent: {},
    students: [{}],
    student: {},
  },
  reducers: {
    fetchAdmin: () => {},
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
    updateStudentsAdmin: (state, action) => {
      state.students = action.payload;
    },
    updateStudentAdmin: (state, action) => {
      state.student = action.payload;
    },
    appendStudentAdmin: (state, action) => {
      state.students = [action.payload, ...state.students];
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
    updateCoursesAdmin: (state, action) => {
      state.courses = action.payload;
    },
    updateCourseAdmin: (state, action) => {
      state.course = action.payload;
    },
    appendCourseAdmin: (state, action) => {
      state.courses = [action.payload, ...state.courses];
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
      console.log(action);
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
  updateAdmin,
  updateTeachersAdmin,
  updateTeacherAdmin,
  appendTeacherAdmin,
  updateParentsAdmin,
  updateParentAdmin,
  appendParentAdmin,
  updateParentStudentsAdmin,
  deleteParentStudentsAdmin,
  updateStudentsAdmin,
  updateStudentAdmin,
  appendStudentAdmin,
  updateCoursesAdmin,
  updateCourseAdmin,
  appendCourseAdmin,
  filterSubjectCourseAdmin,
  updateSubjectAdmin,
  updateCourseStudentAdmin,
  deleteCourseStudentAdmin,
} = adminSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default adminSlice.reducer;
