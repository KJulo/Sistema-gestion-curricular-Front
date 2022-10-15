import { createSlice } from '@reduxjs/toolkit';

// Constants
import { courses } from '@constants/teacher/virtualClass.js';
import { courseNames } from '@constants/teacher/coursesNames';
import { students } from '@constants/teacher/students';
import { studentsMarks } from '@constants/teacher/studentsMarks';

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
      teacher: {
        id: '',
        id_colegio: '',
        nombres: '',
        apellidos: '',
        rut: '',
        constrasena: '',
        correo: '',
      },
      courses: {
        basicInfo: [],
        virtualClasses: courses,
        attendance: courseNames,
        courseFilters: courseNames.map((course) => course.nombre),
        management: {
          course: {},
          units: [],
        },
      },
      students: {
        list: [],
        attendance: students.map((student) => ({ ...student, asistencia: false })),
        marks: studentsMarks,
      }
    },
    reducers: {
      fetchTeacher: () => {},
      fetchCourses: () => {},
      fetchStudents: () => {},
      fetchStudentsNotes: () => {},
      updateTeacher: (state, action) => {
        state.teacher = { ...state.teacher, ...action.payload };
      },
      updateCourses: (state, action) => {
        state.courses.basicInfo = action.payload;
      },
      updateStudents: (state, action) => {
        state.students.list = action.payload.map((student) => {
          return { ...student, notas: [], asistencia: {} }
        });
      },
      updateStudentsNotes: () => {
        const marksList = action.payload;

        const studentsWithNotes = state.students.list.map((student) => { // recorrer la lista de estudiantes
          const mark = marksList.find(e => e.id_alumno === student.id); // ver si hay nota para el estudiante
          if (mark) {
            return { ...student, notas: [...student.notas, mark]}  // retorna al estudiante añadiendo la nueva nota
          } else {
            return student
          }
        })
        
        state.students.list = studentsWithNotes
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
      },
      updateCourseManagement: (state, action) => {
        state.courses.management.course = action.payload;
      },
      appendUnitsManagement: (state, action) => {
        state.courses.management.units = state.courses.management.units.concat(action.payload);
      },
      updateUnitManagement: (state, action) => {
        const unitsUpdated = state.courses.management.units.map((unit) => 
          unit.id === action.payload.id ? action.payload : unit
        )
        state.courses.management.units = unitsUpdated;
      },
      deleteUnitManagement: (state, action) => {
        state.courses.management.units = state.courses.management.units.filter(
          unit => unit.id !== action.payload.id
        )
      },
    }
})

// exportar funciones individuales
export const {
  courseFiltersUpdate,
  updateStudentAttendance,
  fetchTeacher,
  fetchCourses,
  fetchStudents,
  fetchStudentsNotes,
  updateTeacher,
  updateCourses,
  updateStudents,
  updateStudentsNotes,
  updateCourseManagement,
  appendUnitsManagement,
  deleteUnitManagement,
  updateUnitManagement,
} = teacherSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default teacherSlice.reducer;