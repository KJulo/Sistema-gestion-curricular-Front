import services from "@services/asignatura/index";

const { baseAsignaturaURI, asignaturaURI } = services();

const asignatura = (client) => ({
  patchSubject: (data) => client.patch(asignaturaURI.replace(':id', data.id), data),
  deleteSubject: (id) => client.delete(asignaturaURI.replace(":id", id)),
});

export default asignatura;
