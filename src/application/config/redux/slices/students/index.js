import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    student: {},
    attendance: [],
    marks: [],
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

// exportar funciones individuales
export const {
  setIsLoading,
  fetchStudent,
  fetchMarks,
  fetchAttendance,
  updateStudent,
  updateAttendance,
  updateMarks,
  updateFilters,
} = studentSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default studentSlice.reducer;
