import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    student: {},
    attendance: [],
    filters: {},
    isLoading: false,
  },
  reducers: {
    fetchStudent: (state) => {
      state.isLoading = true;
    },
    fetchAttendance: (state) => {
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
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

// exportar funciones individuales
export const {
  fetchStudent,
  updateStudent,
  fetchAttendance,
  updateAttendance,
  setIsLoading,
  updateFilters,
} = studentSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default studentSlice.reducer;
