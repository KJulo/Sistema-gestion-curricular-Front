import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";

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

export const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha",
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
