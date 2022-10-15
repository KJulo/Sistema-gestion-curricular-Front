import services from "@services/notas/index";

const { baseNotasURI, notasURI } = services();

const notas = (client) => ({
  getNotas: () => client.get(baseNotasURI),
  getNotaById: (id) => client.get(notasURI.replace(':id', id)),
});

export default notas;