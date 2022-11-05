import { createSlice } from "@reduxjs/toolkit";

export const parent = createSlice({
  name: "parent",
  initialState: {
    parentData: {},
    students: [],
    notifications: [],
    isLoading: false,
  },
  reducers: {
    fetchParent: (state) => {
      state.isLoading = true;
    },
    fetchStudents: (state) => {
      state.isLoading = true;
    },
    updateParent: (state, action) => {
      state.parentData = action.payload;
      state.isLoading = false;
    },
    updateStudents: (state, action) => {
      const { payload } = action;
      const students = payload.filter((student) => student.id_apoderado === state.parentData.id);
      state.students = students.map((s) => {
        return { ...s, curso: {}, notas: [] };
      });
    },
    updateCourses: (state, action) => {
      const { payload } = action;
      state.students = state.students.map((student) => {
        return {
          ...student,
          curso: payload.find((course) => course.id === student.id_curso),
        };
      });
    },
  },
});

// exportar funciones individuales
export const { fetchParent, updateParent, fetchStudents, updateStudents, updateCourses } =
  parent.actions;

// exportar reducer del slice para mandarlo a la store
export default parent.reducer;
