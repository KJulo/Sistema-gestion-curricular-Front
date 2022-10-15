import services from "@services/apoderado/index";

const { baseApoderadoURI, apoderadoURI } = services();

const apoderado = (client) => ({
  getParents: () => client.get(baseApoderadoURI),
  getParentById: (id) => client.get(apoderadoURI.replace(':id', id)),
});

export default apoderado;