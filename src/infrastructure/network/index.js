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

const clientApiApp = axios.create(/* Configuration */);

export const alumno = alumnoNetwork(clientApiApp);
export const apoderado = apoderadoNetwork(clientApiApp);
export const archivo = archivoNetwork(clientApiApp);
export const asistencia = asistenciaNetwork(clientApiApp);
export const aulaVirtual = aulaVirtualNetwork(clientApiApp);
export const curso = cursoNetwork(clientApiApp);
export const notas = notasNetwork(clientApiApp);
export const profesor = profesorNetwork(clientApiApp);
export const administrador = administradorNetwork(clientApiApp);