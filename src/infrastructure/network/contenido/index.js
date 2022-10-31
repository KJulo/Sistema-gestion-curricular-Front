import services from "@services/contenido/index";

const { baseContenidoURI, contenidoURI } = services();

const contenido = (client) => ({
  getContents: () => client.get(baseContenidoURI),
  getContentById: (id) => client.get(contenidoURI.replace(":id", id)),
  createContent: (params) => client.post(baseContenidoURI, params),
  editContent: (params) => client.patch(contenidoURI.replace(":id", params.id), params),
  deleteContent: (id) => client.delete(contenidoURI.replace(":id", id)),
});

export default contenido;
