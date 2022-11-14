import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";

function getAttendanceStatus(record) {
  switch (record) {
    case "Si":
      return <CheckCircleTwoTone twoToneColor="#52c41a" />;
    case "Justificado":
      return <CheckCircleTwoTone twoToneColor="#ffd400" />;
    case "No":
      return <CloseCircleOutlined twoToneColor="#ff4d4f" />;
  }
}

export const status = ["Si", "No", "Justificado"];

export const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha",
    render: (record) => { 
      return <span>{moment(record).format("DD/MM/YYYY")}</span>;
    }
  },
  {
    title: "Asignatura",
    dataIndex: "asignatura",
    key: "asignatura",
    render: (record) => { 
      return <span>{record.nombre}</span>;
    }
  },
  {
    title: "Asistencia",
    dataIndex: "asistencia",
    key: "asistencia",
    render: (record) => {
      return (
        <div>
          {getAttendanceStatus(record)} {record}
        </div>
      );
    },
  },
];
