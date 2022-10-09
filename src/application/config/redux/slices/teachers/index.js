import { createSlice } from '@reduxjs/toolkit';

// Constants
import { courses } from '@constants/teacher/virtualClass.js';
import { courseNames } from '@constants/teacher/coursesNames';
import { students } from '@constants/teacher/students';
import { studentsMarks } from '@constants/teacher/studentsMarks';

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
      user: {
        id: '',
        id_colegio: '',
        nombres: '',
        apellidos: '',
        rut: '',
        constrasena: '',
        correo: '',
      },
      courses: {
        virtualClasses: courses,
        attendance: courseNames,
        courseFilters: courseNames.map((course) => course.nombre),
      },
      students: {
        attendance: students.map((student) => ({ ...student, asistencia: false })),
        marks: studentsMarks,
      }
    },
    reducers: {
      fetchTeacher: () => {},
      updateTeacher: (state, action) => {
        state.user = action.payload;
      },
      updateStudents: (state, action) => {
        state.students = action.payload;
      },
      updateStudentAttendance: (state, action) => {
        const payload = action.payload;
        const studentList = state.students.attendance.map((student) => {
          if (payload.id === student.id) return {
            ...student,
            asistencia: payload.asistencia
          }
          return student
        });
        return {
          ...state,
          students: {
              ...state.students,
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
  fetchTeacher,
  updateTeacher,
} = teacherSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default teacherSlice.reducer;