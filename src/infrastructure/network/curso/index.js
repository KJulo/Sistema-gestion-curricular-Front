import services from "@services/curso/index";

const { baseCursoURI, cursoURI } = services();

const curso = (client) => ({
  getCourses: () => client.get(baseCursoURI),
  getCourseById: (id) => client.get(cursoURI.replace(':id', id)),
  deleteCourse: (id) => client.delete(cursoURI.replace(':id', id)),
  addCourse: (data) => client.post(baseCursoURI, data),
  patchCourse: (data) => client.patch(cursoURI.replace(':id', data.id), data),
});

export default curso;
 