import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha",
  },
  {
    title: "Asistencia",
    dataIndex: "presente",
    key: "presente",
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
