import services from "@services/notas/index";

const { baseNotaURI, notaURI } = services();

const notas = (client) => ({
  getNotas: () => client.get(baseNotaURI),
  getNotaById: (id) => client.get(notaURI.replace(':id', id)),
});

export default notas;