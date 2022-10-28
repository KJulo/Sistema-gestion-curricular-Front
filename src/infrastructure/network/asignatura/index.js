import services from "@services/asignatura/index";

const { baseAsignaturaURI, asignaturaURI } = services();

const asignatura = (client) => ({
  deleteSubject: (id) => client.delete(asignaturaURI.replace(":id", id)),
});

export default asignatura;
