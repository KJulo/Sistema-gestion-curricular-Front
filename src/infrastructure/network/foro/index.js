import services from "@services/foro/index";

const { baseForoURI, foroURI } = services();

const foro = (client) => ({
  getForums: () => client.get(baseForoURI),
  getForumById: (id) => client.get(foroURI.replace(":id", id)),
  createForum: (payload) => client.post(baseForoURI, payload),
});

export default foro;