import { createSlice } from '@reduxjs/toolkit';

// Constants
import { courses } from '@constants/teacher/virtualClass.js';
import { courseNames } from '@constants/teacher/coursesNames';
import { students } from '@constants/teacher/students';

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
      courses: {
        virtualClasses: courses,
        attendance: courseNames,
        courseFilters: courseNames.map((course) => course.nombre),
      },
      student: {
        attendance: students.map((student) => ({ ...student, asistencia: false })),
      }
    },
    reducers: {
      updateStudents: (state, action) => {
        state.student = action;
      },
      updateStudentAttendance: (state, action) => {
        const payload = action.payload;
        const studentList = state.student.attendance.map((student) => {
          if (payload.id === student.id) return {
            ...student,
            asistencia: payload.asistencia
          }
          return student
        });
        return {
          ...state,
          student: {
              ...state.student,
              attendance: studentList
          }
        }
      }
    }
})

// exportar funciones individuales
export const {
  courseFiltersUpdate,
  updateStudentAttendance,
} = teacherSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default teacherSlice.reducer;