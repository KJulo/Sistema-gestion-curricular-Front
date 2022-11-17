import services from "@services/notificacion/index";

const { baseNotificacionURI, notificacionURI } = services();

const notificacion = (client) => ({
  getNotifications: (params) => client.get(baseNotificacionURI, params),
  getNotificationById: (id) => client.get(notificacionURI.replace(":id", id)),
  addNotification: (params) => client.post(baseNotificacionURI, params),
});

export default notificacion;
