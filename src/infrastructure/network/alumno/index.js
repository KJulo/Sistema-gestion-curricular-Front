import services from "@services/alumno/index";

const { baseAlumnoURI, alumnoURI } = services();

const alumno = (client) => ({
  getStudents: () => client.get(baseAlumnoURI),
  getStudentById: (id) => client.get(alumnoURI.replace(':id', id)),
});


export default alumno;