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
    fetchCourses: (state) => {
      state.isLoading = true;
    },
    fetchStudentsNotes: (state) => {
      state.isLoading = true;
    },
    fetchAttendance: (state) => {
      state.isLoading = true;
    },
    updateParent: (state, action) => {
      state.parentData = action.payload;
      state.isLoading = false;
    },
    fetchNotification: (state, action) => {
      state.isLoading = true;
    },
    updateStudents: (state, action) => {
      const { payload } = action;
      const students = payload.filter((student) => student.id_apoderado === state.parentData.id);
      state.students = students;
      state.isLoading = false;
    },
    updateCourses: (state, action) => {
      const { payload } = action;
      state.students = state.students.map((student) => {
        return {
          ...student,
          curso: payload.find((course) => course.id === student.id_curso),
        };
      });
      state.isLoading = false;
    },
    updateStudentsNotes: (state, action) => {
      const marksList = action.payload;
      const studentsWithNotes = state.students.map((student) => {
        // recorrer la lista de estudiantes
        const mark = marksList.filter((n) => n.id_alumno === student.id); // ver si hay nota para el estudiante
        if (mark) {
          // retorna al estudiante añadiendo la nueva nota
          return {
            ...student,
            notas: mark.map((m) => {
              const nota = m.descripcion;
              delete m.descripcion;
              return { ...m, nota: nota };
            }),
          };
        } else {
          return student;
        }
      });

      state.students = studentsWithNotes;
      state.isLoading = false;
    },
    updateStudentsAttendance: (state, action) => {
      const data = action.payload;
      const studentsWithAttendance = state.students.map((student) => {
        const studentAttendance = data.filter((d) => d.id_alumno === student.id);
        if (studentAttendance.length > 0) {
          return {
            ...student,
            asistencia: studentAttendance.map((a) => {
              return {
                ...a,
                fecha: a.fecha.slice(0, 10),
                registrado: "Si",
              };
            }),
          };
        } else {
          return {
            ...student,
            asistencia: [],
          };
        }
      });
      state.students = studentsWithAttendance;
      state.isLoading = false;
    },
    updateNotification: (state, action) => {
      const data = action.payload;
      state.students = state.students.map((student) => {
        student.id === data.id_alumno ? { ...student, notificacion: data } : student;
      });
      state.isLoading = false;
    },
  },
});

// exportar funciones individuales
export const {
  fetchParent,
  fetchCourses,
  fetchStudentsNotes,
  fetchStudents,
  fetchAttendance,
  fetchNotification,
  updateParent,
  updateStudents,
  updateCourses,
  updateStudentsNotes,
  updateStudentsAttendance,
  updateNotification,
} = parent.actions;

// exportar reducer del slice para mandarlo a la store
export default parent.reducer;
