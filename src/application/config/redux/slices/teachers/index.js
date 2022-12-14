import { createSlice, current } from "@reduxjs/toolkit";

import { initState } from "../../domain/teacher";

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: initState,
  reducers: {
    resetStore: (state) => {
      state = initState;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    fetchTeacher: (state) => {
      state.isLoading = true;
    },
    fetchCourses: (state) => {
      state.isLoading = true;
    },
    fetchStudents: (state) => {
      state.isLoading = true;
    },
    fetchStudentsNotes: (state) => {
      state.isLoading = true;
    },
    fetchAttendance: (state) => {
      state.isLoading = true;
    },
    fetchForumsAndContent: (state) => {
      state.isLoading = true;
    },
    addAttendance: (state) => {
      state.isLoading = true;
    },
    editAttendance: (state) => {
      state.isLoading = true;
    },
    deleteContent: (state) => {
      state.isLoading = true;
    },
    addContent: (state) => {
      state.isLoading = true;
    },
    editContent: (state) => {
      state.isLoading = true;
    },
    addForums: (state) => {
      state.isLoading = true;
    },
    addMarks: (state) => {
      state.isLoading = true;
    },
    addNotificacion: (state) => {
      state.isLoading = true;
    },
    updatingNotificacion: (state) => {
      state.isLoading = true;
    },
    updateMark: (state) => {
      state.isLoading = true;
    },
    deleteMark: (state) => {
      state.isLoading = true;
    },
    updateTeacher: (state, action) => {
      state.teacher = { ...state.teacher, ...action.payload };
      state.isLoading = false;
    },
    updateCourses: (state, action) => {
      state.courses.list = action.payload.filter(
        (course) => course.id_profesor === state.teacher.id
      );
      state.isLoading = false;
    },
    updateStudents: (state, action) => {
      state.students.list = action.payload.map((student) => {
        return { ...student, notas: [], asistencia: {} };
      });
      state.isLoading = false;
    },
    updateStudentsNotes: (state, action) => {
      const marksList = action.payload;

      const studentsWithNotes = state.students.list.map((student) => {
        // recorrer la lista de estudiantes
        const mark = marksList.filter((n) => n.id_alumno === student.id); // ver si hay nota para el estudiante
        if (mark) {
          // retorna al estudiante a??adiendo la nueva nota
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

      state.students.list = studentsWithNotes;
      state.isLoading = false;
    },
    appendStudentsMarks: (state, action) => {
      const marksList = action.payload;
      const studentsWithNotes = state.students.list.map((student) => {
        // recorrer la lista de estudiantes
        const mark = marksList.filter((n) => n.id_alumno === student.id); // ver si hay nota para el estudiante
        if (mark) {
          // retorna al estudiante a??adiendo la nueva nota
          return {
            ...student,
            nota: student.nota.concat(mark),
          };
        } else {
          return student;
        }
      });
      state.students.list = studentsWithNotes;
      state.isLoading = false;
    },
    updateStudentMark: (state, action) => {
      const mark = action.payload;
      const studentsWithNotes = state.students.list.map((student) => {
        if (student.id === mark.id_alumno) {
          //si no tiene nota, eliminarlo
          if (mark.nota === "") {
            return {
              ...student,
              nota: student.nota.filter((n) => n.id !== mark.id),
            };
          }
          return {
            ...student,
            nota: student.nota.map((n) => (n.id === mark.id ? mark : n)),
          };
        } else {
          return student;
        }
      });
      state.students.list = studentsWithNotes;
      state.isLoading = false;
    },
    updateStudentAttendance: (state, action) => {
      const payload = action.payload;
      const studentList = state.students.list.map((student) => {
        // Buscar al estudiante que corresponse la fecha
        if (payload.id === student.id) {
          if (JSON.stringify(student.asistencia) === "{}") {
            student.asistencia = [];
          }
          // Verificar si la fecha fue registrada por parte el endpoint
          if (payload.asistencia.registrado === "Si") {
            return {
              ...student,
              asistencia: student.asistencia.map((a) => {
                // Editar la asistencia en funcion la fecha
                if (a.fecha === payload.asistencia.fecha) {
                  return {
                    ...a,
                    asistencia: payload.asistencia.asistencia,
                    fecha: payload.asistencia.fecha,
                  };
                } else {
                  return a;
                }
              }),
            };
          } else {
            payload.asistencia.registrado = "Si";
            // Caso no registrado
            return {
              ...student,
              asistencia: student.asistencia.concat(payload.asistencia),
            };
          }
        } else {
          return student;
        }
      });
      state.isLoading = false;
      state.students.list = studentList;
    },
    updateCourseManagement: (state, action) => {
      state.courses.management.course = action.payload;
      state.isLoading = false;
    },
    cleanUnitsManagement: (state) => {
      state.courses.management.units = [];
      state.isLoading = false;
    },
    appendUnitsManagement: (state, action) => {
      state.courses.management.units = state.courses.management.units.concat(action.payload);
      state.isLoading = false;
    },
    updateUnitManagement: (state, action) => {
      const unitsUpdated = state.courses.management.units.map((unit) =>
        unit.id === action.payload.id ? action.payload : unit
      );
      state.courses.management.units = unitsUpdated;
      state.isLoading = false;
    },
    appendObjetiveManagement: (state, action) => {
      const payload = action.payload;
      const stateUnits = state.courses.management.units;

      stateUnits.map((unit) => {
        if (unit.id === payload.unit.id) {
          return {
            ...unit,
            objetivos: unit.objetivos.push({
              ...payload.objetive,
              state: false,
            }),
          };
        } else {
          return unit;
        }
      });
      state.isLoading = false;
    },
    editObjetiveManagement: (state, action) => {
      const stateUnits = state.courses.management.units;
      const payObjetive = action.payload.objetive;
      const updatedUnits = stateUnits.map((unit) => {
        if (unit.id === action.payload.unitId) {
          return {
            ...unit,
            objetivos: unit.objetivos.map((obj) => {
              if (obj.id === payObjetive.id) {
                return {
                  ...obj,
                  descripcion: payObjetive.descripcion,
                };
              } else {
                return { ...obj };
              }
            }),
          };
        } else {
          return unit;
        }
      });
      state.courses.management.units = updatedUnits;
      state.isLoading = false;
    },
    deleteObjetiveManagement: (state, action) => {
      const stateUnits = state.courses.management.units;
      const objId = action.payload.objetiveId;
      const updatedUnits = stateUnits.map((unit) => {
        if (unit.id === action.payload.unitId) {
          return {
            ...unit,
            objetivos: unit.objetivos.filter((obj) => obj.id !== objId),
          };
        } else {
          return unit;
        }
      });
      state.courses.management.units = updatedUnits;
      state.isLoading = false;
    },
    appendValueManagement: (state, action) => {
      const payload = action.payload;
      const stateUnits = state.courses.management.units;

      state.courses.management.units = stateUnits.map((unit) => {
        if (unit.id === payload.unit.id) {
          const newValue =
            unit.valores && unit.valores.length
              ? [...unit.valores, payload.value]
              : [payload.value];
          return { ...unit, valores: newValue };
        } else {
          return unit;
        }
      });

      state.isLoading = false;
    },
    editValueManagement: (state, action) => {
      const stateUnits = state.courses.management.units;
      const payValue = action.payload.value;
      const updatedUnits = stateUnits.map((unit) => {
        if (unit.id === action.payload.unitId) {
          return {
            ...unit,
            valores: unit.valores.map((val) => {
              if (val.id === payValue.id) {
                return {
                  ...val,
                  descripcion: payValue.descripcion,
                };
              } else {
                return { ...val };
              }
            }),
          };
        } else {
          return unit;
        }
      });
      state.courses.management.units = updatedUnits;
      state.isLoading = false;
    },
    deleteValueManagement: (state, action) => {
      const stateUnits = state.courses.management.units;
      const valId = action.payload.valueId;
      const updatedUnits = stateUnits.map((unit) => {
        if (unit.id === action.payload.unitId) {
          return {
            ...unit,
            valores: unit.valores.filter((val) => val.id !== valId),
          };
        } else {
          return unit;
        }
      });
      state.courses.management.units = updatedUnits;
      state.isLoading = false;
    },
    updateDateManagement: (state, action) => {
      const data = action.payload;
      state.courses.management.units = state.courses.management.units.map((unit) =>
        unit.id === data.unit.id ? { ...unit, dateRange: data.dateRange } : unit
      );
      state.isLoading = false;
    },
    deleteUnitManagement: (state, action) => {
      const unitDeleted = state.courses.management.units.find(
        (unit) => unit.id === action.payload.id
      );
      const unitsFiltered = state.courses.management.units.filter(
        (unit) => unit.id !== action.payload.id
      );
      state.courses.management.deleted.push(unitDeleted);
      state.courses.management.units = unitsFiltered;
      state.isLoading = false;
    },
    setActiveFilter: (state, action) => {
      const data = action.payload;
      state.activeFilters = { ...state.activeFilters, ...data };
      state.isLoading = false;
    },
    setStudentsAttendance: (state, action) => {
      const data = action.payload;
      const studentsWithAttendance = state.students.list.map((student) => {
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
      state.students.list = studentsWithAttendance;
      state.isLoading = false;
    },
    setForumsAndContent: (state, action) => {
      const { payload } = action;
      const coursesWithForums = state.courses.list.map((course) => {
        return {
          ...course,
          asignaturas: course.asignaturas.map((subject) => {
            return {
              ...subject,
              foros: payload.filter((p) => p.id_asignatura === subject.id),
            };
          }),
        };
      });
      state.courses.list = coursesWithForums;
      state.isLoading = false;
    },
    updateStateForum: (state, action) => {
      const { payload } = action;

      const stateUnits = state.courses.management.units;

      const updatedUnits = stateUnits.map((unit) => {
        if (unit.id === payload.id) {
          if (unit.id.includes("noRegistrado")) {
            return {
              ...unit,
              id: unit.id.replace("noRegistrado", payload.state),
            };
          }
        }
        return unit;
      });
      state.courses.management.units = updatedUnits;
      state.isLoading = false;
    },
    removeContent: (state, action) => {
      const { payload } = action;
      const coursesWithForums = state.courses.list.map((course) => {
        return {
          ...course,
          asignaturas: course.asignaturas.map((subject) => {
            return {
              ...subject,
              foros: subject.foros.map((foro) => {
                return {
                  ...foro,
                  contenidos: foro.contenidos.filter((c) => c.id !== payload.id),
                };
              }),
            };
          }),
        };
      });
      state.courses.list = coursesWithForums;
      state.isLoading = false;
    },
    contentAdded: (state, action) => {
      const { payload } = action;
      const coursesWithForums = state.courses.list.map((course) => {
        return {
          ...course,
          asignaturas: course.asignaturas.map((subject) => {
            return subject.id === payload.id_asignatura
              ? {
                  ...subject,
                  foros: subject.foros.map((foro) => {
                    return foro.id === payload.id_foro
                      ? {
                          ...foro,
                          contenidos: [...foro.contenidos, payload],
                        }
                      : foro;
                  }),
                }
              : subject;
          }),
        };
      });
      state.courses.list = coursesWithForums;
      state.isLoading = false;
    },
    contentEdited: (state, action) => {
      const { payload } = action;
      console.log(payload);
      const coursesWithForums = state.courses.list.map((course) => {
        return {
          ...course,
          asignaturas: course.asignaturas.map((subject) => {
            return {
              ...subject,
              foros: subject.foros.map((foro) => {
                return {
                  ...foro,
                  contenidos: foro.contenidos.map((c) => {
                    if (c.id === payload.id) {
                      return payload;
                    } else {
                      return c;
                    }
                  }),
                };
              }),
            };
          }),
        };
      });
      state.courses.list = coursesWithForums;
      state.isLoading = false;
    },
    forumsAdded: (state, action) => {
      const { payload } = action;
      const coursesWithForums = state.courses.list.map((course) => {
        return {
          ...course,
          asignaturas: course.asignaturas.map((subject) => {
            return {
              ...subject,
              foros: payload,
            };
          }),
        };
      });
      state.courses.list = coursesWithForums;
      state.isLoading = false;
    },
    updateNotifications: (state, action) => {
      const { payload } = action;

      const coursesWithNotifications = state.courses.list.map((course) => {
        const finded = payload.filter((n) => n.id_curso === course.id);
        if (finded) {
          return {
            ...course,
            notificaciones: finded,
          };
        }
        return course;
      });
      state.courses.list = coursesWithNotifications;
      state.isLoading = false;
    },
  },
});

// exportar funciones individuales
export const {
  resetStore,
  setIsLoading,
  courseFiltersUpdate,
  updateStudentAttendance,
  editAttendance,
  fetchTeacher,
  fetchCourses,
  fetchStudents,
  fetchStudentsNotes,
  addContent,
  updateTeacher,
  updateCourses,
  updateStudents,
  updateStudentsNotes,
  updateCourseManagement,
  cleanUnitsManagement,
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
  fetchAttendance,
  setStudentsAttendance,
  addAttendance,
  fetchForumsAndContent,
  setForumsAndContent,
  deleteContent,
  removeContent,
  contentAdded,
  editContent,
  contentEdited,
  addForums,
  forumsAdded,
  addMarks,
  appendStudentsMarks,
  updateStateForum,
  addNotificacion,
  updateNotifications,
  updatingNotificacion,
  updateMark,
  updateStudentMark,
  deleteMark,
} = teacherSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default teacherSlice.reducer;
