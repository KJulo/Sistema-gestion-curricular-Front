import React from "react";

import { getAttendanceStatus, status } from "@constants/attendanceStatus";

export const columns = [
  {
    title: "Nombre",
    dataIndex: "nombres",
    key: "nombres",
    fixed: "left",
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
    fixed: "left",
  },
  {
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
    fixed: "left",
  },
  {
    title: "Asiste",
    dataIndex: "asistencia",
    key: "asistencia",
    fixed: "left",
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
