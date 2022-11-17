import moment from "moment";
import React from "react";

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
    title: "Asignatura",
    dataIndex: "asignatura",
    key: "asignatura",
    render: (record) => {
      return <span>{record}</span>;
    },
  },
  {
    title: "Evaluacion",
    dataIndex: "evaluacion",
    key: "evaluacion",
  },

  {
    title: "Nota",
    dataIndex: "nota",
    key: "nota",
  },
  {
    title: "Ponderación",
    dataIndex: "ponderacion",
    key: "ponderacion",
    render: (record) => {
      return <div>{record * 100} %</div>;
    },
  },
];
