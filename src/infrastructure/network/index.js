import axios from "axios";
import alumnoNetwork from "./alumno";
import apoderadoNetwork from "./apoderado";
import archivoNetwork from "./archivo";
import asistenciaNetwork from "./asistencia";
import aulaVirtualNetwork from "./aulaVirtual";
import cursoNetwork from "./curso";
import notasNetwork from "./notas";
import profesorNetwork from "./profesor";
import administradorNetwork from "./administrador";
import asignaturaNetwork from "./asignatura";
import contenidoNetwork from "./contenido";
import foroNetwork from "./foro";
import notificacionNetwork from "./notificacion";

// AxiosClient es una instancia de axios con configuraciones predefinidas
import store from "@application/config/redux";
const clientApiApp = axios.create();
clientApiApp.interceptors.request.use(function (config) {
  const token = store.getState()?.auth?.token;
  config.headers["x-auth-token"] = token;
  return config
})

export const alumno = alumnoNetwork(clientApiApp);
export const apoderado = apoderadoNetwork(clientApiApp);
export const archivo = archivoNetwork(clientApiApp);
export const asistencia = asistenciaNetwork(clientApiApp);
export const aulaVirtual = aulaVirtualNetwork(clientApiApp);
export const curso = cursoNetwork(clientApiApp);
export const notas = notasNetwork(clientApiApp);
export const profesor = profesorNetwork(clientApiApp);
export const administrador = administradorNetwork(clientApiApp);
export const asignatura = asignaturaNetwork(clientApiApp);
export const contenido = contenidoNetwork(clientApiApp);
export const foro = foroNetwork(clientApiApp);
export const notificacion = notificacionNetwork(clientApiApp);