import services from "@services/apoderado/index";

const { baseApoderadoURI, apoderadoURI } = services();

const apoderado = (client) => ({
  getParents: () => client.get(baseApoderadoURI),
  getParentById: (id) => client.get(apoderadoURI.replace(':id', id)),
  deleteParent: (id) => client.delete(apoderadoURI.replace(':id', id)),
  addParent: (data) => client.post(baseApoderadoURI, data),
  patchParent: (data) => client.patch(apoderadoURI.replace(':id', data.id), data),
});

export default apoderado;