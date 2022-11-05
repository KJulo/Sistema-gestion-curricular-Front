import services from "@services/asistencia/index";

const { baseAsistenciaURI, asistenciaURI } = services();

const asistencia = (client) => ({
  getAttendance: () => client.get(baseAsistenciaURI),
  getAttendanceById: (id) => client.get(asistenciaURI.replace(":id", id)),
  addAttendance: (payload) => client.post(baseAsistenciaURI, payload),
  editAttendance: ({ id, data }) => client.patch(asistenciaURI.replace(":id", id), data),
});

export default asistencia;
