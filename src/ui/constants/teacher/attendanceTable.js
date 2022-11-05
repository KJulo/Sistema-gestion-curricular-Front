import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";

function getAttendanceStatus(record) {
  switch (record) {
    case "No":
      return <CloseCircleOutlined twoToneColor="#eb2f96" />;
    case "Si":
      return <CheckCircleTwoTone twoToneColor="#52c41a" />;
    case "Justificado":
      return <CheckCircleTwoTone twoToneColor="#ffd400" />;
    case "Injustificado":
      return <CloseCircleOutlined twoToneColor="#e24743" />;
  }
}

export const status = ["No", "Si", "Justificado", "Injustificado"];

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
