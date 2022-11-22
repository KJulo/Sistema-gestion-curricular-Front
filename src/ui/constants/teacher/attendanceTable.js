import React from "react";

import { getAttendanceStatus, status } from "@constants/attendanceStatus";

export const columns = [
  {
    title: "Nombre",
    dataIndex: "nombres",
    key: "nombres",
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
  },
  {
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
  },
  {
    title: "Asiste",
    dataIndex: "asistencia",
    key: "asistencia",
    render: (record) => {
      return (
        <div>
          {record.asistencia ? (
            <>
              {getAttendanceStatus(record.asistencia)} {record.asistencia}
            </>
          ) : (
            <>
              {getAttendanceStatus(status[0])} {status[0]}
            </>
          )}
        </div>
      );
    },
  },
];
