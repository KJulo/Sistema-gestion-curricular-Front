import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
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
          {record ? "Si " : "No "}
            {record
            ? ( <CheckCircleTwoTone twoToneColor="#52c41a" />)
            : <CloseCircleOutlined twoToneColor="#ee1111" /> }
        </div>
      );
    },
  }
];
