import React from "react";

export const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha",
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
      return (
        <div>
          { record*100 } %
        </div>
      );
    },
  }
];