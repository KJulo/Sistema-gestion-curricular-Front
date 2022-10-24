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
        marks: {
          activeFilter: '',
        },
      },
      isLoading: false,
    },
    reducers: {
      setIsLoading: (state, action) => { state.isLoading = action.payload },
      fetchTeacher: (state) => { state.isLoading = true },
      fetchCourses: (state) => { state.isLoading = true },
      fetchStudents: (state) => { state.isLoading = true },
      fetchStudentsNotes: (state) => { state.isLoading = true },
      updateTeacher: (state, action) => {
        state.teacher = { ...state.teacher, ...action.payload };
        state.isLoading = false;
      },
      updateCourses: (state, action) => {
        state.courses.basicInfo = action.payload.filter((course) => course.id_profesor === state.teacher.id);
        state.isLoading = false;
      },
      updateStudents: (state, action) => {
        state.students.list = action.payload.map((student) => {
          return { ...student, notas: [], asistencia: {} }
        });
        state.isLoading = false;
      },
      updateStudentsNotes: (state, action) => {
        const marksList = action.payload;

        const studentsWithNotes = state.students.list.map((student) => { // recorrer la lista de estudiantes
          const mark = marksList.filter(n => n.id_alumno === student.id); // ver si hay nota para el estudiante
          if (mark) {
             // retorna al estudiante añadiendo la nueva nota
            return { ...student, notas: mark.map(m => {
              const nota = m.descripcion
              delete m.descripcion
              return {...m, nota: nota}
            })}
          } else {
            return student
          }
        })
        
        state.students.list = studentsWithNotes
        state.isLoading = false;
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
        // TODO reemplazar este return por un seteo normal
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
        state.isLoading = false;
      },
      appendUnitsManagement: (state, action) => {
        state.courses.management.units = state.courses.management.units.concat(action.payload);
        state.isLoading = false;
      },
      updateUnitManagement: (state, action) => {
        const unitsUpdated = state.courses.management.units.map((unit) => 
          unit.id === action.payload.id ? action.payload : unit
        )
        state.courses.management.units = unitsUpdated;
        state.isLoading = false;
      },
      appendObjetiveManagement: (state, action) => {
        const payload = action.payload;
        const stateUnits = state.courses.management.units;

        stateUnits.map(unit => {
          if (unit.id === payload.unit.id) {
            return { ...unit, objetivos: unit.objetivos.push(payload.objetive)}
          } else {
            return unit
          }
        });
      },
      editObjetiveManagement: (state, action) => {
        const stateUnits = state.courses.management.units;
        const payObjetive = action.payload.objetive;
        const updatedUnits = stateUnits.map(unit => {
          if (unit.id === action.payload.unitId) {
            return {
              ...unit,
              objetivos: unit.objetivos.map(obj => {
                if (obj.id === payObjetive.id) {
                  return {
                    ...obj,
                    descripcion: payObjetive.descripcion
                  }
                } else {
                  return { ...obj }
                }
              })
            }
          } else {
            return unit
          }
        })
        state.courses.management.units = updatedUnits;
      },
      deleteObjetiveManagement: (state, action) => {
        const stateUnits = state.courses.management.units;
        const objId = action.payload.objetiveId;
        const updatedUnits = stateUnits.map(unit => {
          if (unit.id === action.payload.unitId) {
            return {
              ...unit,
              objetivos: unit.objetivos.filter(obj => obj.id !== objId)
            }
          } else {
            return unit
          }
        })
        state.courses.management.units = updatedUnits;
      },
      appendValueManagement: (state, action) => {
        const payload = action.payload;
        const stateUnits = state.courses.management.units;

        stateUnits.map(unit => {
          if (unit.id === payload.unit.id) {
            return { ...unit, valores: unit.valores.push(payload.value)}
          } else {
            return unit
          }
        });
      },
      editValueManagement: (state, action) => {
        const stateUnits = state.courses.management.units;
        const payValue = action.payload.value;
        const updatedUnits = stateUnits.map(unit => {
          if (unit.id === action.payload.unitId) {
            return {
              ...unit,
              valores: unit.valores.map(val => {
                if (val.id === payValue.id) {
                  return {
                    ...val,
                    descripcion: payValue.descripcion
                  }
                } else {
                  return { ...val }
                }
              })
            }
          } else {
            return unit
          }
        })
        state.courses.management.units = updatedUnits;
      },
      deleteValueManagement: (state, action) => {
        const stateUnits = state.courses.management.units;
        const valId = action.payload.valueId;
        const updatedUnits = stateUnits.map(unit => {
          if (unit.id === action.payload.unitId) {
            return {
              ...unit,
              valores: unit.valores.filter(val => val.id !== valId)
            }
          } else {
            return unit
          }
        })
        state.courses.management.units = updatedUnits;
      },
      updateDateManagement: (state, action) => {
        const data = action.payload;
        state.courses.management.units = state.courses.management.units.map((unit) => (
          unit.id === data.unit.id
          ? { ...unit, dateRange: data.dateRange}
          : unit
        ))
      },
      deleteUnitManagement: (state, action) => {
        state.courses.management.units = state.courses.management.units.filter(
          unit => unit.id !== action.payload.id
        )
        state.isLoading = false;
      },
      setActiveFilter: (state, action) => {
        const data = action.payload;
        state.students.marks.activeFilter = data.filter;
      },
    }
})

// exportar funciones individuales
export const {
  setIsLoading,
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
  appendObjetiveManagement,
  editObjetiveManagement,
  deleteObjetiveManagement,
  updateDateManagement,
  appendValueManagement,
  editValueManagement,
  deleteValueManagement,
  setActiveFilter,
} = teacherSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default teacherSlice.reducer;