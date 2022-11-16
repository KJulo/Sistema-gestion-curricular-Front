import services from "@services/usuario/index";

const { changePassword } = services();

const usuario = (client) => ({
  changePassword: (data) => client.post(changePassword.replace(":id", data.id), data),
});

export default usuario