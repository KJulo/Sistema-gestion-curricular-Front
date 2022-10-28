import services from "@services/contenido/index";

const { baseContenidoURI, contenidoURI } = services();

const contenido = (client) => ({
  getContents: () => client.get(baseContenidoURI),
  getContentById: (id) => client.get(contenidoURI.replace(':id', id)),
});


export default contenido;