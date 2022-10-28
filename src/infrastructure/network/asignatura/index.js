import services from "@services/asignatura/index";

const { baseAsignaturaURI, asignaturaURI } = services();

const asignatura = (client) => ({
  getAsignaturas: () => client.get(baseAsignaturaURI),
  getAsignaturaById: (id) => client.get(asignaturaURI.replace(':id', id)),
});


export default asignatura;