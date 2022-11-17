import React from "react";

import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";

export function getAttendanceStatus(record) {
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
