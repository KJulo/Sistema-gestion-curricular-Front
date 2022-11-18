// Constants
export const initState = {
  teacher: {
    id: "",
    id_colegio: "",
    nombres: "",
    apellidos: "",
    rut: "",
    constrasena: "",
    correo: "",
  },
  courses: {
    list: [],
    management: {
      course: {},
      units: [],
      deleted: [],
    },
  },
  students: {
    list: [],
    marks: {
      activeFilter: "",
    },
  },
  activeFilters: {},
  isLoading: false,
};
