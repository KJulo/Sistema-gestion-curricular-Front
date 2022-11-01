import services from "@services/administrador/index";

const { baseAdministradorURI, administradorURI } = services();

const administrador = (client) => ({
  getAdmins: () => client.get(baseAdministradorURI),
  getAdminById: (id) => client.get(administradorURI.replace(':id', id)),
});


export default administrador;