import services from "@services/asignatura/index";

const { baseAsignaturaURI, asignaturaURI } = services();

const asignatura = (client) => ({
  getAsignaturas: () => client.get(baseAsignaturaURI),
  getAsignaturaById: (id) => client.get(asignaturaURI.replace(":id", id)),
  patchSubject: (data) =>
    client.patch(asignaturaURI.replace(":id", data.id), data),
  deleteSubject: (id) => client.delete(asignaturaURI.replace(":id", id)),
});

export default asignatura;
