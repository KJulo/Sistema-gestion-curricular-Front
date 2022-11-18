import services from "@services/notas/index";

const { baseNotaURI, notaURI } = services();

const notas = (client) => ({
  getNotas: () => client.get(baseNotaURI),
  getNotaById: (id) => client.get(notaURI.replace(":id", id)),
  addNota: (payload) => client.post(baseNotaURI, payload),
  editNota: ({ id, payload }) => client.patch(notaURI.replace(":id", id), payload),
  deleteNota: (id) => client.delete(notaURI.replace(":id", id)),
});

export default notas;
