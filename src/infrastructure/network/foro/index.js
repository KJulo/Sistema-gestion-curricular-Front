import services from "@services/foro/index";

const { baseForoURI, foroURI } = services();

const foro = (client) => ({
  getForums: () => client.get(baseForoURI),
  getForumById: (id) => client.get(foroURI.replace(":id", id)),
  createForum: (payload) => client.post(baseForoURI, payload),
  editForum: ({ id, payload }) => client.patch(foroURI.replace(":id", id), payload),
  deleteForum: (id) => client.delete(foroURI.replace(":id", id)),
});

export default foro;
