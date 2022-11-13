import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    student: {},
    attendance: [],
    marks: [],
    course: {},
    filters: {},
    isLoading: true,
  },
  reducers: {
    fetchStudent: (state) => {
      state.isLoading = true;
    },
    fetchAttendance: (state) => {
      state.isLoading = true;
    },
    fetchMarks: (state) => {
      state.isLoading = true;
    },
    fetchNotification: (state) => {
      state.isLoading = true;
    },
    fetchCourse: (state) => {
      state.isLoading = true;
    },
    fetchForumsAndContent: (state) => {
      state.isLoading = true;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateNotification: (state, action) => {
      state.notifications = action.payload;
    },
    updateStudent: (state, action) => {
      state.student = { ...state.student, ...action.payload };
      state.isLoading = false;
    },
    updateAttendance: (state, action) => {
      const payload = action.payload;
      const attendance = payload.filter((p) => p.id_alumno === state.student.id);
      state.attendance = attendance;
      state.isLoading = false;
    },
    updateMarks: (state, action) => {
      const { marks, subjects } = action.payload;
      state.marks = marks.map((m) => {
        const subject = subjects.find((s) => s.id === m.id_asignatura);
        return {
          fecha: m.fecha.slice(0, 10),
          asignatura: subject.nombre,
          evaluacion: m.nombre,
          nota: parseFloat(m.descripcion),
          ponderacion: parseFloat(m.ponderacion),
        };
      });
      state.isLoading = false;
    },
    updateForumsAndContent: (state, action) => {
      const { payload } = action;
      console.log(payload);
      console.log(state.course);
      state.course = {
        ...state.course,
        asignaturas: state.course.asignaturas.map((subject) => {
          return {
            ...subject,
            foros: payload.filter((p) => p.id_asignatura === subject.id),
          };
        }),
      };
      state.isLoading = false;
    },
    updateCourse: (state, action) => {
      const { payload } = action;
      state.course = payload.find((p) => p.id === state.student.id_curso);
      state.isLoading = false;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

// exportar funciones individuales
export const {
  setIsLoading,
  fetchStudent,
  fetchNotification,
  fetchMarks,
  fetchAttendance,
  fetchCourse,
  fetchForumsAndContent,
  updateStudent,
  updateNotification,
  updateAttendance,
  updateMarks,
  updateFilters,
  updateForumsAndContent,
  updateCourse,
} = studentSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default studentSlice.reducer;
