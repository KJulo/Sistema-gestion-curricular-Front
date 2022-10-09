import services from "@services/curso/index";

const { baseCursoURI, cursoURI } = services();

const curso = (client) => ({
  getCourses: () => client.get(baseCursoURI),
  getCourseById: (id) => client.get(cursoURI.replace(':id', id)),
});

export default curso;
 