// Constants
import { courses } from '@constants/teacher/virtualClass.js';

export const initState = {
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
    management: {
      course: {},
      units: [],
    },
  },
  students: {
    list: [],
    marks: {
      activeFilter: '',
    },
  },
  isLoading: false,
  activeFilters: {},
}