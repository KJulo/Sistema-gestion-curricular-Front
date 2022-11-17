import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";

import { getAttendanceStatus, status } from "@constants/attendanceStatus";

export const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha",
    render: (record) => {
      return <span>{moment(record).format("DD/MM/YYYY")}</span>;
    },
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
