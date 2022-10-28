import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "Nombre",
    dataIndex: "nombres",
    key: "nombres",
    fixed: "left",
  },{
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
    fixed: "left",
  },{
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
    fixed: "left",
  },{
    title: "Asiste",
    dataIndex: "asistencia",
    key: "asistencia",
    fixed: "left",
    render: (record) => {
      return (
        <div>
          {record.asiste ? "Si " : "No "}
            {record.asiste
            ? ( <CheckCircleTwoTone twoToneColor="#52c41a" />)
            : <CloseCircleOutlined twoToneColor="#ee1111" /> }
        </div>
      );
    },
  }
];
