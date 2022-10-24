import services from "@services/alumno/index";

const { baseAlumnoURI, alumnoURI } = services();

const alumno = (client) => ({
  getStudents: () => client.get(baseAlumnoURI),
  getStudentById: (id) => client.get(alumnoURI.replace(':id', id)),
  deleteStudent: (id) => client.delete(alumnoURI.replace(':id', id)),
  addStudent: (data) => client.post(baseAlumnoURI, data),
  patchStudent: (data) => client.patch(alumnoURI.replace(':id', data.id), data),
});


export default alumno;