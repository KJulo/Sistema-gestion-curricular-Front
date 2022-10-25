import services from "@services/asistencia/index";

const { baseAsistenciaURI, asistenciaURI } = services();

const asistencia = (client) => ({
  getAttendance: () => client.get(baseAsistenciaURI),
  getAttendanceById: (id) => client.get(asistenciaURI.replace(':id', id)),
  addAttendance: (params) => client.get(baseAsistenciaURI, {params}),
});

export default asistencia;
